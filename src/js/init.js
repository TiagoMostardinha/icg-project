// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinhaa
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import MODEL from './models/apartments.js'
import USER from './user/user.js'
import OBJECT from './models/objects.js'
import GROUND from './models/ground.js'
import * as ACTIONS from './actions/actions.js'
import LIGHTS from './lights/light.js'

function init() {
    let inventory = [];
    let grid = buildGrid();
    let listObjects = [];

    // Init the 3D renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create the 3D scene
    let scene = new THREE.Scene();

    // Add camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(20, 70, 70);

    // Draw objects

    // GROUND
    grid = GROUND.buildGround(scene, grid);

    // TARGET
    grid = GROUND.chooseTarget(scene, grid);

    // SCENARIO
    grid = MODEL.generateScenario(scene, grid);

    // OBJECTS
    listObjects = OBJECT.placeObjects(scene, grid);

    // USER
    scene = USER.buildUser(scene);
    let user = scene.getObjectByName('user');
    console.log("USER", user); // Check if user object is being retrieved

    let spotlight = USER.buildSpotlight();
    scene.add(spotlight);
    spotlight.target.updateMatrixWorld();

    // Add event listener to capture keydown events
    document.addEventListener('keydown', function (event) {

        // Pass the event, user object, scene, and inventory to userMoves function
        USER.userMoves(event, user, scene, inventory);

        // Get the updated inventory from the user object
        inventory = USER.getInventory();

        // Check if level is complete
        if (OBJECT.checkLevelComplete(grid, listObjects)) {
            alert("You won!");
            window.location.reload();
        }
    });

    // Helpers

    // AXES HELPER
    const axesHelper = new THREE.AxesHelper(30);
    scene.add(axesHelper);

    // Lights

    // AMBIENT LIGHT
    LIGHTS.addAmbientLight(scene);

    // DIRECTIONAL LIGHT
    LIGHTS.addDirectionalLight(scene);

    // Shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    LIGHTS.addShadowsChildren(scene);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        orbit.update();
    }

    animate();

    ACTIONS.centerCamera(camera);

    // Render the scene once to ensure that the user object is visible
    renderer.render(scene, camera);
}


function buildGrid() {
    const grid = [];
    for (let i = 0; i < 10; i++) {
        grid.push(Array(10).fill("x"));
    }
    grid[9][4] = "u";
    grid[9][5] = "u";
    grid[8][4] = "u";
    grid[8][5] = "u";

    return grid;
}

// Responsible with the code to start the game
init();

ACTIONS.newGame();
ACTIONS.startTimer();   
