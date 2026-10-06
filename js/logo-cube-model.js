import * as THREE from './vendor/three.module.js';

// As letras são geometria extrudada: vazados e espessura reais, sem texturas.
function letterD() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.91, -0.91);
  shape.lineTo(0.38, -0.91);
  shape.quadraticCurveTo(0.91, -0.91, 0.91, -0.38);
  shape.lineTo(0.91, 0.38);
  shape.quadraticCurveTo(0.91, 0.91, 0.38, 0.91);
  shape.lineTo(-0.91, 0.91);
  shape.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-0.5, -0.49);
  hole.lineTo(-0.5, 0.49);
  hole.lineTo(0.25, 0.49);
  hole.quadraticCurveTo(0.49, 0.49, 0.49, 0.25);
  hole.lineTo(0.49, -0.25);
  hole.quadraticCurveTo(0.49, -0.49, 0.25, -0.49);
  hole.closePath();
  shape.holes.push(hole);
  return shape;
}

function letterP() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.91, -0.91);
  shape.lineTo(-0.91, 0.91);
  shape.lineTo(0.4, 0.91);
  shape.quadraticCurveTo(0.91, 0.91, 0.91, 0.4);
  shape.lineTo(0.91, -0.1);
  shape.quadraticCurveTo(0.91, -0.6, 0.4, -0.6);
  shape.lineTo(-0.5, -0.6);
  shape.lineTo(-0.5, -0.91);
  shape.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-0.5, -0.18);
  hole.lineTo(-0.5, 0.49);
  hole.lineTo(0.25, 0.49);
  hole.quadraticCurveTo(0.49, 0.49, 0.49, 0.25);
  hole.lineTo(0.49, 0.06);
  hole.quadraticCurveTo(0.49, -0.18, 0.25, -0.18);
  hole.closePath();
  shape.holes.push(hole);
  return shape;
}

function letterS() {
  const shape = new THREE.Shape();
  const points = [[0.91, 0.91], [-0.91, 0.91], [-0.91, -0.18],
    [0.49, -0.18], [0.49, -0.49], [-0.91, -0.49], [-0.91, -0.91],
    [0.91, -0.91], [0.91, 0.24], [-0.49, 0.24], [-0.49, 0.49], [0.91, 0.49]];
  // Arredonda os cantos do S como uma peça metálica usinada.
  points.forEach(([x, y], index) => {
    const previous = points[(index + points.length - 1) % points.length];
    const next = points[(index + 1) % points.length];
    const incoming = new THREE.Vector2(previous[0] - x, previous[1] - y).normalize().multiplyScalar(0.055);
    const outgoing = new THREE.Vector2(next[0] - x, next[1] - y).normalize().multiplyScalar(0.055);
    if (index === 0) shape.moveTo(x + incoming.x, y + incoming.y);
    else shape.lineTo(x + incoming.x, y + incoming.y);
    shape.quadraticCurveTo(x, y, x + outgoing.x, y + outgoing.y);
  });
  shape.closePath();
  return shape;
}

export function createLogoCube() {
  const group = new THREE.Group();
  group.name = 'Dev Point Studio';
  const white = new THREE.MeshPhysicalMaterial({ color: '#e8e9ed', roughness: 0.22, metalness: 0.88, clearcoat: 1, clearcoatRoughness: 0.16, envMapIntensity: 1.25 });
  const red = new THREE.MeshPhysicalMaterial({ color: '#e60016', roughness: 0.2, metalness: 0.65, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.1 });
  const dark = new THREE.MeshStandardMaterial({ color: '#08080b', roughness: 0.27, metalness: 0.55 });
  const core = new THREE.Mesh(new THREE.BoxGeometry(1.94, 1.94, 1.94), dark);
  core.name = 'cube-core';
  group.add(core);

  function face(shape, material, name) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12, bevelEnabled: true, bevelSegments: 5,
      steps: 1, bevelSize: 0.025, bevelThickness: 0.025, curveSegments: 28,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    group.add(mesh);
    return mesh;
  }
  const top = face(letterD(), red, 'D-top');
  top.rotation.x = -Math.PI / 2;
  top.position.y = 1;
  const left = face(letterP(), white, 'P-front');
  left.position.z = 1;
  const right = face(letterS(), white, 'S-right');
  right.rotation.y = Math.PI / 2;
  right.position.x = 1;

  // O ponto vermelho separado no canto inferior é parte da identidade da marca.
  const dot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.08), red);
  dot.name = 'brand-dot';
  dot.position.set(-0.76, -1.24, 1.035);
  group.add(dot);
  return group;
}
