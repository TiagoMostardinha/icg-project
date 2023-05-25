// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinha
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';

const inventory_container = document.getElementById('inventory-container');
let angle = Math.PI;
let inventory = [];

export class UserControls {
    static model = new THREE.Group();
    static scene = new THREE.Scene();

    constructor(model, scene) {
        this.model = model;
        this.scene = scene;
    }


    update(keysPressed, spotlight) {
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
        // Make sure the user stays within the x-coordinate bounds
        if (this.model.position.x < 0) {
            this.model.position.setX(0);
        } else if (this.model.position.x > 50) {
            this.model.position.setX(50);
        }

        if (this.model.position.z < 0) {
            this.model.position.setZ(0);
        } else if (this.model.position.z > 50) {
            this.model.position.setZ(50);
        }

        spotlight.target.position.set(this.model.position.x + Math.sin(angle), 5, this.model.position.z + Math.cos(angle));
        spotlight.target.updateMatrixWorld();
        spotlight.updateMatrixWorld();

        console.log(this.model.position.x, this.model.position.z);
    }


modelHasObjectInFront() {
    // Create a raycaster from the model's position in the direction they are facing
    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3();
    const modelPosition = this.model.position.clone();
    modelPosition.y += 2; // Move the raycaster up to the model's height
    direction.set(0, 0, -1); // Set the direction based on the model's rotation
    direction.applyQuaternion(this.model.quaternion);
    raycaster.set(modelPosition, direction);

    // Check for intersections with objects in the scene
    const intersects = raycaster.intersectObjects(this.scene.children, true);

    // Loop through the intersections and check the distance
    const closestIntersection = intersects.find(intersect => intersect.object.name === "target");
    if (closestIntersection) {
        return closestIntersection.object;
    }

    return false;
}

grabObject() {
    // Check if there is an object in front of the model
    let object = this.modelHasObjectInFront();
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
    this.scene.remove(object);

    this.sendInventory();
}

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

getInventory() {
    return inventory;
}

placeObject() {
    // Check if there is an object in front of the model
    if (this.modelHasObjectInFront() !== false) {
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
        this.model.getWorldDirection(modelDirection);
        const objectPosition = this.model.position.clone().addScaledVector(modelDirection, -4); // Place the object 4 units in front of the model
        object.position.copy(objectPosition);
        object.position.y = 2;
        this.scene.add(object);
        console.log("Object Placed.")
        try {
            inventory_container.removeChild(inventory_container.childNodes[0]);
        } catch (e) {
            return;
        }

    }
}

}


export default {
    buildSpotlight() {
        const spotlight = new THREE.SpotLight(0xff0000, 1);
        spotlight.position.set(22.5, 6, 45);
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

}
