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
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { UserControls } from './user/user.js';

function init() {
    let inventory = [];
    let grid = buildGrid();
    let listObjects = [];

    // ************************** //
    // Init the 3D renderer
    // ************************** //
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // ************************** //
    // Create the 3D scene
    // ************************** //
    let scene = new THREE.Scene();

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
    camera.position.set(20, 70, 70);


    // ************************** //
    // Draw Objects
    // ************************** //
    // GROUND
    grid = GROUND.buildGround(scene, grid);

    // TARGET
    grid = GROUND.chooseTarget(scene, grid);

    // SCENARIO
    grid = MODEL.generateScenario(scene, grid);

    // OBJECTS
    listObjects = OBJECT.placeObjects(scene, grid);

    // USER
    var userControls;
    new GLTFLoader().load('./assets/M4.glb', (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.03, 0.03, 0.03);
        model.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });
        model.position.set(25, 0, 45);
        model.receiveShadow = true;
        scene.add(model);

        userControls = new UserControls(model,scene);
    });

    let keyPressed;
    document.addEventListener('keydown', (event) => {
        keyPressed = event.key;
    }, false);

    document.addEventListener('keyup', () => {
        keyPressed = null;
    }, false);


    let spotlight = USER.buildSpotlight();
    scene.add(spotlight);
    spotlight.target.updateMatrixWorld();

    // ************************** //
    // Helpers
    // ************************** //
    // AXES HELPER
    const axesHelper = new THREE.AxesHelper(30);
    scene.add(axesHelper);


    // ************************** //
    // Lights
    // ************************** //
    // AMBIENT LIGHT
    LIGHTS.addAmbientLight(scene);

    // DIRECTIONAL LIGHT
    LIGHTS.addDirectionalLight(scene);


    // ************************** //
    // Shadows
    // ************************** //
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    LIGHTS.addShadowsChildren(scene);




    // ************************** //
    function animate() {
        if (userControls) {
            userControls.update(keyPressed, spotlight,scene);
            scene = userControls.getScene();
        }
        
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        orbit.update(); // update the state of OrbitControls
    }
    animate();

    ACTIONS.centerCamera(camera);

    // ************************** //
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
