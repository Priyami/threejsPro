import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

scene.background = new THREE.Color("black");

camera.position.z = 3;

function makeInstance(geometry, color, x, y, z) {
  const material = new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const wireMesh = new THREE.Mesh(geometry, wireMat);
  wireMesh.scale.setScalar(1.04);
  cube.add(wireMesh);

  cube.position.set(x, y, z);

  scene.add(cube);
  return cube;
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.003;
function addLight(...pos) {
  const color = 0xcfffff;
  const intensity = 2;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
}
addLight(1, -2, 4);

function hsl(h, s, l) {
  return new THREE.Color().setHSL(h, s, l);
}

const d = 0.8;
const cubes = [
  makeInstance(geometry, hsl(0 / 8, 1, 0.5), -d, -d, -d),
  makeInstance(geometry, hsl(1 / 8, 1, 0.5), d, -d, -d),
  makeInstance(geometry, hsl(2 / 8, 1, 0.5), d, d, -d),
  makeInstance(geometry, hsl(3 / 8, 1, 0.5), -d, d, d),
  // makeInstance(geometry, hsl(4 / 8, 1, 0.5), -d, -d, d),
  // makeInstance(geometry, hsl(5 / 8, 1, 0.5), d, -d, d),
  // makeInstance(geometry, hsl(6 / 8, 1, 0.5), d, d, d),
  // makeInstance(geometry, hsl(7 / 8, 1, 0.5), -d, d, -d),
  // makeInstance(geometry, hsl(8 / 8, 1, 0.5), d, -d, d),
];

function render(time) {
  time *= 0.0002; // convert time to seconds

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * 0.1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
