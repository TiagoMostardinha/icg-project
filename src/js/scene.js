import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ************************** //
// Init the 3D renderer
// ************************** //
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// ************************** //
// Create the 3D scene
// ************************** //
const scene = new THREE.Scene();


// ************************** //
// Add camera
// ************************** //
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 8, 8);

// ************************** //
// Draw Objects
// ************************** //

// PLANE
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(25, 0, 25);
plane.rotation.set(-0.5 * Math.PI, 0, 0);

scene.add(plane);

// ************************** //
// Helpers
// ************************** //
// AXES HELPER
const axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);


// ************************** //
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    orbit.update(); // update the state of OrbitControls
}
animate();

// ************************** //
renderer.render(scene, camera);