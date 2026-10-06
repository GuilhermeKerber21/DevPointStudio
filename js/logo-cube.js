import * as THREE from './vendor/three.module.js';
import { createLogoCube } from './logo-cube-model.js';

const host = document.getElementById('hero_logo_cube');
if (host) {
  try { mountLogo(host); }
  catch (error) { console.warn('Logo 3D indisponível; exibindo a imagem da marca.', error); }
}

function mountLogo(host) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  // Estúdio de reflexos gerado em código, sem carregar mapas HDR externos.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color('#15151b');
  function softbox(width, height, position, intensity) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ color: new THREE.Color().setScalar(intensity), side: THREE.DoubleSide }));
    panel.position.set(...position);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
  }
  softbox(5, 8, [-5, 3, 4], 4);
  softbox(3, 7, [5, 2, 2], 3);
  softbox(6, 4, [0, 6, -1], 5);
  softbox(1, 6, [1, 1, -5], 2);
  const environmentGenerator = new THREE.PMREMGenerator(renderer);
  const environment = environmentGenerator.fromScene(studio, 0.04);
  scene.environment = environment.texture;
  environmentGenerator.dispose();
  studio.traverse(object => { if (object.isMesh) { object.geometry.dispose(); object.material.dispose(); } });
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 30);
  camera.position.set(4.6, 3.6, 4.6);
  camera.lookAt(0, -0.08, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x181820, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(3, 6, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 1.1);
  fill.position.set(-4, 1, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xff153a, 2.5);
  rim.position.set(1, 3, -4);
  scene.add(rim);
  const logo = createLogoCube();
  const spinPivot = new THREE.Group();
  spinPivot.add(logo);
  scene.add(spinPivot);

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  let frame = 0;
  let elapsed = 0;
  let lastTime = 0;
  let transformed = false;
  let transitioning = false;

  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();
  host.classList.add('is_ready');

  function render(time) {
    frame = 0;
    if (!visible || document.hidden || motion.matches || transformed) return;
    const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    elapsed += dt;
    const smoothing = 1 - Math.exp(-dt * 6);
    // Ciclos sobrepostos deixam o movimento orgânico, com as faces da marca visíveis.
    const tilt = Math.sin(elapsed * 0.95) * 0.12 + Math.sin(elapsed * 1.7) * 0.035;
    const turn = Math.sin(elapsed * 0.7) * 0.34 + Math.sin(elapsed * 1.25) * 0.065;
    const roll = Math.sin(elapsed * 0.85) * 0.075;
    logo.rotation.x += (tilt - logo.rotation.x) * smoothing;
    logo.rotation.y += (turn - logo.rotation.y) * smoothing;
    logo.rotation.z += (roll - logo.rotation.z) * smoothing;
    logo.position.y = Math.sin(elapsed * 1.35) * 0.14;
    logo.position.x = Math.sin(elapsed * 0.7) * 0.055;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }
  function resume() {
    if (transitioning) return;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    if (transformed) return;
    if (motion.matches) {
      spinPivot.rotation.y = 0;
      logo.rotation.set(0, 0, 0);
      logo.position.set(0, 0, 0);
      renderer.render(scene, camera);
    } else if (visible && !document.hidden) frame = requestAnimationFrame(render);
  }
  function revealName() {
    if (transitioning || !visible) return;
    if (transformed) { revealCube(); return; }
    transformed = true;
    transitioning = !motion.matches;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    host.classList.add('is_wordmark');
    host.setAttribute('aria-label', 'Clique para voltar à logo 3D da Dev Point Studio');
    if (!motion.matches) {
      // Rotação e recolhimento em 3D, sincronizados com a entrada das palavras.
      const started = performance.now();
      function collapse(now) {
        const progress = Math.min((now - started) / 900, 1);
        const eased = progress * progress * (3 - 2 * progress);
        spinPivot.rotation.y = eased * Math.PI * 1.5;
        spinPivot.rotation.z = eased * -0.35;
        spinPivot.scale.setScalar(Math.max(0.001, 1 - eased));
        renderer.render(scene, camera);
        if (progress < 1) frame = requestAnimationFrame(collapse);
        else frame = 0;
      }
      frame = requestAnimationFrame(collapse);
      setTimeout(() => { transitioning = false; }, 1750);
    }
  }
  function revealCube() {
    transitioning = true;
    host.classList.add('is_returning');
    const started = performance.now();
    function finish() {
      spinPivot.rotation.set(0, 0, 0);
      spinPivot.scale.setScalar(1);
      host.classList.remove('is_wordmark', 'is_returning');
      host.setAttribute('aria-label', 'Clique para revelar o nome Dev Point Studio');
      transformed = false;
      transitioning = false;
      resume();
    }
    if (motion.matches) { finish(); return; }
    function expand(now) {
      const progress = Math.min(Math.max((now - started - 300) / 900, 0), 1);
      const eased = progress * progress * (3 - 2 * progress);
      spinPivot.rotation.y = (1 - eased) * -Math.PI * 1.5;
      spinPivot.rotation.z = (1 - eased) * 0.35;
      spinPivot.scale.setScalar(Math.max(0.001, eased));
      renderer.render(scene, camera);
      if (progress < 1) frame = requestAnimationFrame(expand);
      else { frame = 0; finish(); }
    }
    frame = requestAnimationFrame(expand);
  }
  host.setAttribute('role', 'button');
  host.setAttribute('tabindex', '0');
  host.setAttribute('aria-label', 'Clique para revelar o nome Dev Point Studio');
  host.addEventListener('click', revealName);
  host.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      revealName();
    }
  });
  const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
  intersectionObserver.observe(host);
  document.addEventListener('visibilitychange', resume);
  motion.addEventListener('change', resume);
  renderer.domElement.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    visible = false;
    resume();
    host.classList.remove('is_ready');
    renderer.domElement.style.display = 'none';
  });
  resume();
}
