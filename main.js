import * as THREE from "three";

const images = [
  "socrates.jpg",
  "stars.jpg",
  "wave.jpg",
  "spring.jpg",
  "mountain.jpg",
  "sunday.jpg",
];

const titles = [
  "The Death of Socrates",
  "Starry Night",
  "The Great Wave off Kanagawa",
  "Effect of Spring, Giverny",
  "Mount Corcoran",
  "A Sunday on La Grande Jatte",
];

const artists = [
  "Jacques-Louis David",
  "Vincent Van Gogh",
  "Katsushika Hokusai",
  "Claude Monet",
  "Albert Bierstadt",
  "George Seurat",
];

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const geometry = new THREE.BoxGeometry(2, 3, 4);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 10;

function animate(time) {
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
