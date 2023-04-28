// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinhaa
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';

const inventory_container = document.getElementById('inventory-container');
let angle = Math.PI;
let inventory = [];

export class UserControls {
    static model = new THREE.Group();
    static scene = new THREE.Scene();

    constructor(model,scene) {
        this.model = model;
        this.scene = scene;
    }


    update(keysPressed, spotlight,scene) {
        switch (keysPressed) {
            case "ArrowLeft":
                this.model.rotateY(0.05); // Rotate left by 0.1 radians
                angle += 0.05;
                break;
            case "ArrowUp":
                if (this.model.position.z > 0) { // Check if the this.model is already at the minimum z-coordinate
                    this.model.translateZ(-0.25); // Move forward by 1 unit

                    spotlight.position.set(this.model.position.x, 6, this.model.position.z);
                }
                break;
            case "ArrowRight":
                this.model.rotateY(-0.05); // Rotate right by 0.1 radians
                angle += -0.05;
                break;
            case "ArrowDown":
                if (this.model.position.z < 50) { // Check if the this.model is already at the maximum z-coordinate
                    this.model.translateZ(0.25); // Move backward by 1 unit

                    spotlight.position.set(this.model.position.x, 6, this.model.position.z);
                }
                break;
            case "g": // G key
                this.grabObject(this.model, this.scene);
                break;
            case "p": // P key
                this.placeObject(this.model, this.scene);
                break;
        }
    }
    
    getScene() {
        return this.scene;
    }
}


export default {
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

    modelMoves(e, model, scene) {
        let spotlight = scene.getObjectByName('spotlight');

        switch (e.keyCode) {
            case 37: // Left arrow key
                model.rotateY(0.2); // Rotate left by 0.1 radians
                angle += 0.2;
                break;
            case 38: // Up arrow key
                if (model.position.z > 0) { // Check if the model is already at the minimum z-coordinate
                    model.translateZ(-1); // Move forward by 1 unit

                    spotlight.position.set(model.position.x, 6, model.position.z);
                }
                break;
            case 39: // Right arrow key
                model.rotateY(-0.2); // Rotate right by 0.1 radians
                angle += -0.2;
                break;
            case 40: // Down arrow key
                if (model.position.z < 50) { // Check if the model is already at the maximum z-coordinate
                    model.translateZ(1); // Move backward by 1 unit

                    spotlight.position.set(model.position.x, 6, model.position.z);
                }
                break;
            case 71: // G key
                this.grabObject(model, scene);
                break;
            case 80: // P key
                this.placeObject(model, scene);
                break;
        }

        // Make sure the model stays within the x-coordinate bounds
        if (model.position.x < 0) {
            model.position.setX(0);
        } else if (model.position.x > 50) {
            model.position.setX(50);
        }

        if (model.position.z < 0) {
            model.position.setZ(0);
        } else if (model.position.z > 50) {
            model.position.setZ(50);
        }

        spotlight.target.position.set(model.position.x + Math.sin(angle), 5, model.position.z + Math.cos(angle));
        spotlight.target.updateMatrixWorld();
        spotlight.updateMatrixWorld();
    },

    modelHasObjectInFront(model, scene) {
        // Create a raycaster from the model's position in the direction they are facing
        const raycaster = new THREE.Raycaster();
        const direction = new THREE.Vector3();
        const modelPosition = model.position.clone();
        direction.set(0, 0, -1); // Set the direction based on the model's rotation
        direction.applyQuaternion(model.quaternion);
        raycaster.set(modelPosition, direction);

        // Check for intersections with objects in the scene
        const intersects = raycaster.intersectObjects(scene.children, true);

        // Loop through the intersections and check the distance
        for (let i = 0; i < intersects.length; i++) {
            const distance = intersects[i].distance;
            if (distance < 3) {
                // There is an object in front of the model within 5 units
                return intersects[i].object;
            }
        }

        return false;
    },

    grabObject(model, scene) {
        // Check if there is an object in front of the model
        let object = this.modelHasObjectInFront(model, scene);
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

    placeObject(model, scene) {
        // Check if there is an object in front of the model
        if (this.modelHasObjectInFront(model, scene) !== false) {
            console.log("Has an object in front.");
            return;
        }
        // Check if the model has an object in their inventory
        if (inventory.length == 0) {
            console.log("No object in inventory to place.");
            return;
        } else {
            let object = inventory.pop();
            // Set the position of the object in front of the model
            const modelDirection = new THREE.Vector3();
            model.getWorldDirection(modelDirection);
            const objectPosition = model.position.clone().addScaledVector(modelDirection, -4); // Place the object 4 units in front of the model
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
