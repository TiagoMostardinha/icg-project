// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinhaa
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const inventory_container = document.getElementById('inventory-container');
let angle = Math.PI;

let inventory = [];

export default {
    buildUser(scene) {
        const loader = new GLTFLoader();
        loader.load(
            './assets/M4.glb',
            (gltf) => {
                scene.add(gltf.scene);
                gltf.scene.scale.set(0.05, 0.05, 0.05);
                gltf.scene.position.set(25, 0, 45);
                gltf.scene.name = 'user';
                gltf.scene.castShadow = true;
                gltf.scene.receiveShadow = true;
                console.log("ola", gltf.scene);
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.log('An error happened', error);
            }
        );
        return scene;
    },

    buildSpotlight() {
        const spotlight = new THREE.SpotLight(0xff0000, 1);
        spotlight.position.set(25, 6, 45);
        spotlight.angle = Math.PI / 8;
        spotlight.penumbra = 0.05;
        spotlight.decay = 2;
        spotlight.distance = 200;
        spotlight.castShadow = true;
        spotlight.shadow.mapSize.width = 512;
        spotlight.shadow.mapSize.height = 512;
        spotlight.shadow.camera.near = 1;
        spotlight.shadow.camera.far = 20;
        spotlight.target.position.y = 5;
        spotlight.target.position.x = 25;
        spotlight.name = 'spotlight';
        spotlight.shadow.camera.left = -5;
        spotlight.shadow.camera.right = 5;
        spotlight.shadow.camera.top = 5;
        spotlight.shadow.camera.bottom = -5;
        return spotlight;
    },

    userMoves(e, user, scene) {
        let spotlight = scene.getObjectByName('spotlight');

        switch (e.keyCode) {
            case 37: // Left arrow key
                user.rotateY(0.2); // Rotate left by 0.1 radians
                angle += 0.2;
                break;
            case 38: // Up arrow key
                if (user.position.z > 0) { // Check if the user is already at the minimum z-coordinate
                    user.translateZ(-1); // Move forward by 1 unit

                    spotlight.position.set(user.position.x, 6, user.position.z);
                }
                break;
            case 39: // Right arrow key
                user.rotateY(-0.2); // Rotate right by 0.1 radians
                angle += -0.2;
                break;
            case 40: // Down arrow key
                if (user.position.z < 50) { // Check if the user is already at the maximum z-coordinate
                    user.translateZ(1); // Move backward by 1 unit

                    spotlight.position.set(user.position.x, 6, user.position.z);
                }
                break;
            case 71: // G key
                this.grabObject(user, scene);
                break;
            case 80: // P key
                this.placeObject(user, scene);
                break;
        }

        // Make sure the user stays within the x-coordinate bounds
        if (user.position.x < 0) {
            user.position.setX(0);
        } else if (user.position.x > 50) {
            user.position.setX(50);
        }

        if (user.position.z < 0) {
            user.position.setZ(0);
        } else if (user.position.z > 50) {
            user.position.setZ(50);
        }

        spotlight.target.position.set(user.position.x + Math.sin(angle), 5, user.position.z + Math.cos(angle));
        spotlight.target.updateMatrixWorld();
        spotlight.updateMatrixWorld();
    },

    userHasObjectInFront(user, scene) {
        // Create a raycaster from the user's position in the direction they are facing
        const raycaster = new THREE.Raycaster();
        const direction = new THREE.Vector3();
        const userPosition = user.position.clone();
        direction.set(0, 0, -1); // Set the direction based on the user's rotation
        direction.applyQuaternion(user.quaternion);
        raycaster.set(userPosition, direction);

        // Check for intersections with objects in the scene
        const intersects = raycaster.intersectObjects(scene.children, true);

        // Loop through the intersections and check the distance
        for (let i = 0; i < intersects.length; i++) {
            const distance = intersects[i].distance;
            if (distance < 3) {
                // There is an object in front of the user within 5 units
                return intersects[i].object;
            }
        }

        return false;
    },

    grabObject(user, scene) {
        // Check if there is an object in front of the user
        let object = this.userHasObjectInFront(user, scene);
        if (object == false) {
            // Perform grabbing logic here
            console.log("No object in front to grab.");
            return;
        }

        if (object.name != "target") {
            console.log("Can't grab this object.");
            return;
        }
        inventory.push(object);
        scene.remove(object);

        this.sendInventory();
    },

    placeObject(user, scene) {
        // Check if there is an object in front of the user
        if (this.userHasObjectInFront(user, scene) !== false) {
            console.log("Has an object in front.");
            return;
        }
        // Check if the user has an object in their inventory
        if (inventory.length == 0) {
            console.log("No object in inventory to place.");
            return;
        } else {
            let object = inventory.pop();
            // Set the position of the object in front of the user
            const userDirection = new THREE.Vector3();
            user.getWorldDirection(userDirection);
            const objectPosition = user.position.clone().addScaledVector(userDirection, -4); // Place the object 4 units in front of the user
            object.position.copy(objectPosition);
            scene.add(object);
            console.log("Object Placed.")
            try {
                inventory_container.removeChild(inventory_container.childNodes[0]);
            } catch (e) {
                return;
            }

        }
    },

    getInventory() {
        return inventory;
    },

    sendInventory() {
        const coin = document.createElement('img');
        coin.src = './img/coin.png';
        try {
            while (inventory_container.firstChild) {
                inventory_container.removeChild(inventory_container.firstChild);
            }
        } catch (e) {
            console.log(e);
        }

        for (let i = 0; i < inventory.length; i++) {
            const coin = document.createElement('img');
            coin.src = './img/coin.png';
            inventory_container.appendChild(coin);
        }
    }
}
