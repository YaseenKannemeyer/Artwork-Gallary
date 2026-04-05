# ️ Three.js 3D Art Gallery

A interactive 3D art gallery built with **Three.js** and **Vite**, featuring a rotating circular display of classic masterpieces — complete with gold-framed artworks, museum-style plaques, and a mirror-polished floor.

> Built by following the [Three.js Crash Course for Beginners | Build a 3D Art/Project Gallery!](https://www.youtube.com/watch?v=HxPgbXlq1mo) tutorial by **Dan Greenheck**, with personal customisations added on top.

---

## Screenshots

<img width="1431" height="733" alt="Screenshot 2026-04-05 at 17 11 16" src="https://github.com/user-attachments/assets/8abea83b-f091-4305-81ad-47d739c771f7" />



---

## Features

- **Circular rotating gallery** — 6 artworks arranged in a 360° ring
- **Smooth transitions** — powered by `tween.js` with quadratic easing
- **Gold ornate frames** — layered `BoxGeometry` with metallic materials simulating a real picture frame
- **Museum-style plaques** — each artwork displays its title, artist, year, and a short description, fading in and out on rotation
- **Mirror floor** — reflective `Reflector` surface for a polished gallery aesthetic
- **Raycasting navigation** — click left/right arrow buttons rendered in 3D space to navigate between artworks
- **Spotlight lighting** — dramatic overhead spotlight with ambient fill

---

## ️ What I Changed from the Tutorial

The base project followed Dan Greenheck's tutorial, but I made the following original additions:

- **Redesigned the frame** — replaced the simple border with a two-layer gold frame using a `MeshStandardMaterial` with high `metalness` and low `roughness` for a realistic sheen, plus an inner bevel layer for depth
- **Museum-style art plaque** — added a styled HTML overlay that mimics a real gallery plaque, showing the artwork's title, artist name, year, and a descriptive paragraph, all with a smooth opacity fade transition between artworks

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/YaseenKannemeyer/Artwork-Gallary.git
cd Artwork-Gallary

# Install Three.js
npm install --save three

# Install Vite (dev dependency)
npm install --save-dev vite
```

### Running Locally

```bash
npm run dev
```

Then open your browser at `http://localhost:5173`.

---

## Project Structure

```
├── public/
│ ├── socrates.jpg
│ ├── stars.jpg
│ ├── wave.jpg
│ ├── spring.jpg
│ ├── mountain.jpg
│ ├── sunday.jpg
│ ├── left.png
│ └── right.png
├── index.html
├── main.js
├── package.json
└── README.md
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Three.js](https://threejs.org/) | 3D rendering and scene management |
| [Vite](https://vitejs.dev/) | Dev server and bundler |
| [tween.js](https://github.com/tweenjs/tween.js) | Smooth animation easing |
| Three.js `Reflector` | Mirror floor effect |
| Three.js `Raycaster` | Click detection on 3D objects |

---

## Dependencies

```json
{
 "dependencies": {
 "three": "^x.x.x"
 },
 "devDependencies": {
 "vite": "^x.x.x"
 }
}
```

---

## Core Concepts Learned

### 1. Three.js Fundamentals
- Set up a 3D scene using Three.js
- Created and configured a `Scene`, `PerspectiveCamera`, and `WebGLRenderer`
- Understood the render loop using `setAnimationLoop`

### 2. Working with 3D Objects & Geometry
- Built objects using `BoxGeometry` (frames, artwork, arrows) and `CircleGeometry` (mirror floor)
- Used `MeshStandardMaterial` for realistic rendering
- Learned how meshes = geometry + material

### 3. Textures & Image Mapping
- Loaded images using `TextureLoader`
- Applied textures to simulate real artworks
- Handled color space (sRGB) for accurate visuals

### 4. Scene Graph & Transformations
- Used `Object3D` as a parent (`rootNode`) to group objects and rotate the entire gallery
- Positioned objects in 3D space using `position` and `rotation`

### 5. Lighting & Realism
- Implemented `AmbientLight` for base lighting and `SpotLight` for focused illumination
- Learned how lighting affects material realism

### 6. Advanced Visual Effects
- Added a reflective floor using `Reflector`
- Improved visual depth and realism for a more immersive gallery environment

### 7. Interactivity (Raycasting)
- Implemented mouse click detection using `Raycaster`
- Detected which object was clicked in 3D space using `object.name` and `userData`
- Enabled interaction with the navigation arrows

### 8. Animations with Tweening
- Used tween.js for smooth transitions
- Animated gallery rotation with easing (`Quadratic.InOut`)
- Managed animation lifecycle with `.start()`, `.onStart()`, and `.onComplete()`

### 9. UI + 3D Integration
- Connected 3D interactions to DOM elements (title, artist, year, description)
- Dynamically updated content during transitions
- Used opacity changes for smooth UI transitions

---

## Resources

- [Tutorial: Three.js Crash Course for Beginners by Dan Greenheck](https://www.youtube.com/watch?v=HxPgbXlq1mo)
- [Three.js Official Docs](https://threejs.org/manual/#en/installation)
- [Vite Getting Started](https://vitejs.dev/guide/)

---

## Author

**Yaseen Kannemeyer** 
Built as a learning project to explore Three.js, 3D scene composition, and interactive web experiences.

---

## License

This project is open source and available under the [MIT License](LICENSE).
