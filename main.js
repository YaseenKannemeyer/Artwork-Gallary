import * as THREE from "three";
import { texture } from "three/tsl";

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

const textureLoader = new THREE.TextureLoader();

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

const rootNode = new THREE.Object3D();
scene.add(rootNode);

let count = 6;
for (let i = 0; i < count; i++) {
  const texture = textureLoader.load(images[i]);
  texture.colorSpace = THREE.SRGBColorSpace;

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = i * ((Math.PI * 2) / count);
  rootNode.add(baseNode);

  const border = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.9),
    new THREE.MeshBasicMaterial({ color: 0x202020 }),
  );
  border.position.z = -4.5;
  baseNode.add(border);

  const artwork = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.1),
    new THREE.MeshBasicMaterial({ map: texture }),
  );
  artwork.position.z = -4;
  baseNode.add(artwork);
}

function animate() {
  rootNode.rotation.y += 0.002;
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
