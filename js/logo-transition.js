import * as THREE from './vendor/three.module.js';

export const TRANSITION_DURATION = 2600;
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };

// A mesma linha do tempo é percorrida ao contrário para remontar o cubo.
export function transitionState(milliseconds) {
  const t = Math.max(0, Math.min(TRANSITION_DURATION, milliseconds));
  return {
    flights: Array(3).fill(smooth((t - 400) / 1600)),
    words: Array(3).fill(smooth((t - 1700) / 850)),
    shell: 1 - smooth((t - 900) / 1300),
    core: 1 - smooth((t - 250) / 1100),
    shift: smooth(t / 900),
  };
}

export function createLogoTransition(logo, camera, host) {
  const words = [
    host.querySelector('.hero_wordmark_line > span:first-child'),
    host.querySelector('.hero_wordmark_line > span:last-child'),
    host.querySelector('.hero_wordmark_studio'),
  ];
  const names = ['D-top', 'P-front', 'S-right'];
  const pieces = names.map(name => logo.getObjectByName(name));
  const originals = logo.children.map(mesh => {
    const material = mesh.material;
    mesh.material = material.clone();
    mesh.material.transparent = true;
    return { mesh, material, position: mesh.position.clone(), quaternion: mesh.quaternion.clone(), scale: mesh.scale.clone() };
  });
  const snapshots = pieces.map(mesh => originals.find(item => item.mesh === mesh));
  const targetOffsets = [0, 0, 0];
  const targets = pieces.map(() => new THREE.Vector3());
  const cameraFacing = new THREE.Quaternion();
  const cameraRight = new THREE.Vector3();
  const cameraUp = new THREE.Vector3();
  const cameraForward = new THREE.Vector3();
  const downOffset = new THREE.Vector3();
  const shellOffset = new THREE.Vector3();
  const flightStart = new THREE.Vector3();
  let flightScale = 0.4;

  function layout() {
    logo.updateWorldMatrix(true, true);
    camera.updateWorldMatrix(true, false);
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const distance = 4.4;
    const viewHeight = 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const viewWidth = viewHeight * camera.aspect;
    cameraRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
    cameraUp.set(0, 1, 0).applyQuaternion(camera.quaternion);
    cameraForward.set(0, 0, -1).applyQuaternion(camera.quaternion);
    const inverse = logo.getWorldQuaternion(new THREE.Quaternion()).invert();
    cameraFacing.copy(inverse).multiply(camera.quaternion);
    const cubeDistance = camera.position.distanceTo(logo.getWorldPosition(new THREE.Vector3()));
    const cubeViewHeight = 2 * cubeDistance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    downOffset.copy(cameraUp).multiplyScalar(-cubeViewHeight * 0.18).applyQuaternion(inverse);
    flightScale = Math.min(0.55, viewHeight * 0.21);
    pieces.forEach((mesh, index) => {
      const word = words[index < 2 ? index : 2].getBoundingClientRect();
      const x = ((word.left + word.width / 2 - rect.left) / rect.width - 0.5) * viewWidth;
      const y = (0.5 - (word.top + word.height / 2 - rect.top) / rect.height) * viewHeight;
      const target = targets[index];
      target.copy(camera.position).addScaledVector(cameraForward, distance);
      target.addScaledVector(cameraRight, x + targetOffsets[index] * viewWidth);
      target.addScaledVector(cameraUp, y);
      logo.worldToLocal(target);
    });
  }

  function update(milliseconds) {
    const state = transitionState(milliseconds);
    shellOffset.copy(downOffset).multiplyScalar(state.shift);
    originals.forEach(({ mesh, position }) => {
      mesh.position.copy(position).add(shellOffset);
      mesh.material.opacity = mesh.name === 'cube-core' ? state.core : state.shell;
      mesh.material.depthWrite = mesh.material.opacity > 0.98;
    });
    pieces.forEach((mesh, index) => {
      const start = snapshots[index];
      const progress = state.flights[index];
      flightStart.copy(start.position).add(shellOffset);
      mesh.position.lerpVectors(flightStart, targets[index], progress);
      // Primeiro solta a face, depois a orienta para a tela durante o voo.
      const arc = Math.sin(progress * Math.PI) * 0.42;
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(start.quaternion);
      mesh.position.addScaledVector(normal, arc);
      mesh.quaternion.slerpQuaternions(start.quaternion, cameraFacing, smooth(progress));
      mesh.scale.copy(start.scale).lerp(new THREE.Vector3().setScalar(flightScale), progress);
      mesh.material.opacity = 1 - smooth((progress - 0.72) / 0.28);
      mesh.material.depthWrite = mesh.material.opacity > 0.98;
    });
    words.forEach((word, index) => {
      const progress = state.words[index];
      word.style.opacity = String(progress);
      word.style.transform = `translateY(${(1 - progress) * 12}px) scale(${0.94 + progress * 0.06})`;
      word.style.filter = `blur(${(1 - progress) * 5}px)`;
    });
  }

  function restore() {
    originals.forEach(({ mesh, material, position, quaternion, scale }) => {
      mesh.position.copy(position);
      mesh.quaternion.copy(quaternion);
      mesh.scale.copy(scale);
      mesh.material.dispose();
      mesh.material = material;
    });
    words.forEach(word => {
      word.style.removeProperty('opacity');
      word.style.removeProperty('transform');
      word.style.removeProperty('filter');
    });
  }

  return { layout, update, restore };
}
