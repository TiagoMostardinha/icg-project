import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import MODEL from './models/apartments.js'
import USER from './user/actions.js'
import OBJECT from './models/objects.js'
import GROUND from './models/ground.js'


function init() {
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

    // ************************** //
    // Draw Objects
    // ************************** //
    MODEL.generateScenario(scene,grid);



    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(20, 70, 70);
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
}

function buildGrid() {
    const matrix = [];
    for (let i = 0; i < 10; i++) {
        matrix.push(Array(10).fill("x"));
    }
    return matrix;
}

// Responsible with the code to start the game
const inventory = [];
const grid = buildGrid();
init();