import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import MODEL from './models/apartments.js'
import ACTIONS from './user/actions.js'
import OBJECT from './models/objects.js'


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

// PLANE
const planeGeometry = new THREE.PlaneGeometry(50, 50,10,10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(25, 0, 25);
plane.rotation.set(-0.5 * Math.PI, 0, 0);

scene.add(plane);

// BOX1
const box1 = MODEL.buildSmallApartment();

box1.position.set(30,15,20);

scene.add(box1);

// BOX2
const box2 = MODEL.buildLargeApartment();
box2.position.set(10,10,40);

scene.add(box2);

// BOX3
const box3 = MODEL.buildLongApartment();
box3.position.set(40,10,40)

scene.add(box3);

// OBJECT1
const obj1 = OBJECT.object1();
obj1.position.set(10,2,10);

scene.add(obj1);

// OBJECT2
const obj2 = OBJECT.object2();
obj2.position.set(40,2,10);

scene.add(obj2);

// USER
const userGeometry = new THREE.BoxGeometry(4,4,4);
const userMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
const user = new THREE.Mesh(userGeometry,userMaterial);

user.position.set(20,2,20);

document.onkeydown = function(e){
    ACTIONS.userActions(e,user);
}

scene.add(user);

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