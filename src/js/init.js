import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import MODEL from './models/apartments.js'
import USER from './user/user.js'
import OBJECT from './models/objects.js'
import GROUND from './models/ground.js'


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
    let user = USER.buildUser();
    scene.add(user);

    document.onkeydown = function (e) {
        USER.userMoves(e, user, scene, inventory);
        inventory = USER.getInventory();

        if (OBJECT.checkLevelComplete(grid,listObjects)) {
            alert("You won!");
            window.location.reload();
        }
    };

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