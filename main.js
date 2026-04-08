import * as THREE from "three";
import { Reflector } from "three/examples/jsm/Addons.js";
import { Tween, Easing, update as updateTween } from "tween";

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
  "The Great Wave of Kanagawa",
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

const years = ["1787", "1889", "1831", "1886", "1876", "1886"];

const descriptions = [
  "Painted in 1787, this neoclassical masterpiece captures the final moments of Socrates as he calmly accepts his death sentence, symbolizing reason, sacrifice, and moral conviction.",
  "Created in 1889, this iconic work depicts Van Gogh's view from his asylum room in Saint-Rémy, with swirling skies and vivid emotion expressing inner turmoil and beauty.",
  "This famous woodblock print from the 1830s shows a towering wave threatening boats near Mount Fuji, representing the power of nature and the fragility of human life.",
  "Monet's impressionist piece captures the vibrant colors and soft light of spring in his Giverny garden, emphasizing atmosphere over detail.",
  "Painted in 1876, this dramatic landscape portrays the grandeur of the American West, highlighting nature's scale and untouched beauty.",
  "Completed in 1886, this pointillist painting shows Parisians relaxing by the Seine, using tiny dots of color to create harmony and structure.",
];

const textureLoader = new THREE.TextureLoader();

/* ===== RENDERER ===== */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setAnimationLoop(animate);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

/* ===== SCENE ===== */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

/* ===== CAMERA ===== */
function getIdealFOV() {
  return window.innerWidth < 600 ? 90 : 75;
}

const camera = new THREE.PerspectiveCamera(
  getIdealFOV(),
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 1, 2);

/* ===== ROOT ===== */
const rootNode = new THREE.Object3D();
scene.add(rootNode);

/* ===== TEXTURES ===== */
const leftArrowTexture = textureLoader.load("left.png");
const rightArrowTexture = textureLoader.load("right.png");

/* ===== GALLERY ===== */
const count = 6;

for (let i = 0; i < count; i++) {
  const texture = textureLoader.load(images[i]);
  texture.colorSpace = THREE.SRGBColorSpace;

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = i * ((Math.PI * 2) / count);
  rootNode.add(baseNode);

  // Outer frame
  const border = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.9),
    new THREE.MeshStandardMaterial({
      color: 0xc8a400,
      metalness: 0.95,
      roughness: 0.25,
    }),
  );
  border.position.z = -4.5;
  baseNode.add(border);

  // Inner bevel
  const innerBevel = new THREE.Mesh(
    new THREE.BoxGeometry(3.05, 2.05, 0.95),
    new THREE.MeshStandardMaterial({
      color: 0x8b6914,
      metalness: 0.9,
      roughness: 0.4,
    }),
  );
  innerBevel.position.z = -4.48;
  baseNode.add(innerBevel);

  // Artwork
  const artwork = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.1),
    new THREE.MeshStandardMaterial({ map: texture }),
  );
  artwork.position.z = -4;
  baseNode.add(artwork);

  // Left arrow
  const leftArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({
      map: leftArrowTexture,
      transparent: true,
    }),
  );
  leftArrow.name = "LeftArrow";
  leftArrow.userData = i === count - 1 ? 0 : i + 1;
  leftArrow.position.set(-1.8, 0, -4);
  baseNode.add(leftArrow);

  // Right arrow
  const rightArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({
      map: rightArrowTexture,
      transparent: true,
    }),
  );
  rightArrow.name = "RightArrow";
  rightArrow.userData = i === 0 ? count - 1 : i - 1;
  rightArrow.position.set(1.8, 0, -4);
  baseNode.add(rightArrow);
}

/* ===== LIGHTING ===== */
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10.0, 0.65, 1);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 0.5, -5);
scene.add(spotlight);
scene.add(spotlight.target);

/* ===== MIRROR FLOOR ===== */
const mirror = new Reflector(new THREE.CircleGeometry(10), {
  color: 0x303030,
  textureWidth: window.innerWidth,
  textureHeight: window.innerHeight,
});
mirror.position.y = -1.15;
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

/* ===== ROTATION ===== */
let isAnimating = false;

function rotateGallery(direction, newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  const deltaY = direction * ((Math.PI * 2) / count);

  new Tween(rootNode.rotation)
    .to({ y: rootNode.rotation.y + deltaY }, 800)
    .easing(Easing.Quadratic.InOut)
    .start()
    .onStart(() => {
      document.getElementById("year").style.opacity = 0;
      document.getElementById("title").style.opacity = 0;
      document.getElementById("artist").style.opacity = 0;
      document.getElementById("description").style.opacity = 0;
    })
    .onComplete(() => {
      document.getElementById("year").innerText = years[newIndex];
      document.getElementById("title").innerText = titles[newIndex];
      document.getElementById("artist").innerText = artists[newIndex];
      document.getElementById("description").innerText = descriptions[newIndex];

      document.getElementById("year").style.opacity = 1;
      document.getElementById("title").style.opacity = 1;
      document.getElementById("artist").style.opacity = 1;
      document.getElementById("description").style.opacity = 1;

      isAnimating = false;
    });
}

/* ===== RAYCASTING (shared) ===== */
function handleInteraction(clientX, clientY) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(
    (clientX / window.innerWidth) * 2 - 1,
    -(clientY / window.innerHeight) * 2 + 1,
  );

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(rootNode, true);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    if (obj.name === "LeftArrow") rotateGallery(-1, obj.userData);
    if (obj.name === "RightArrow") rotateGallery(1, obj.userData);
  }
}

/* ===== CLICK ===== */
window.addEventListener("click", (ev) => {
  handleInteraction(ev.clientX, ev.clientY);
});

/* ===== TOUCH ===== */
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener(
  "touchstart",
  (ev) => {
    touchStartX = ev.touches[0].clientX;
    touchStartY = ev.touches[0].clientY;
  },
  { passive: true },
);

window.addEventListener(
  "touchend",
  (ev) => {
    const touch = ev.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    // If the finger moved more than 8px it's a swipe, not a tap — ignore
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) return;

    ev.preventDefault();
    handleInteraction(touch.clientX, touch.clientY);
  },
  { passive: false },
);

/* ===== SWIPE TO NAVIGATE ===== */
window.addEventListener(
  "touchstart",
  (ev) => {
    touchStartX = ev.touches[0].clientX;
  },
  { passive: true },
);

window.addEventListener(
  "touchend",
  (ev) => {
    const dx = ev.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return; // too short to be a swipe

    // Determine current index from rotation
    const step = (Math.PI * 2) / count;
    const raw = -rootNode.rotation.y / step;
    const currentIndex = ((Math.round(raw) % count) + count) % count;

    if (dx < 0) {
      // Swipe left → go right (next)
      const next = currentIndex === 0 ? count - 1 : currentIndex - 1;
      rotateGallery(1, next);
    } else {
      // Swipe right → go left (prev)
      const prev = currentIndex === count - 1 ? 0 : currentIndex + 1;
      rotateGallery(-1, prev);
    }
  },
  { passive: true },
);

/* ===== ANIMATE ===== */
function animate() {
  updateTween();
  renderer.render(scene, camera);
}

/* ===== RESIZE ===== */
window.addEventListener("resize", () => {
  camera.fov = getIdealFOV();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  mirror.getRenderTarget().setSize(window.innerWidth, window.innerHeight);
});

/* ===== INITIAL TEXT ===== */
document.getElementById("year").innerText = years[0];
document.getElementById("title").innerText = titles[0];
document.getElementById("artist").innerText = artists[0];
document.getElementById("description").innerText = descriptions[0];
