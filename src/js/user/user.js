// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinhaa
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';

const inventory_container = document.getElementById('inventory-container');

let inventory = [];

export default {
    buildUser() {
        const userGeometry = new THREE.SphereGeometry(2, 20, 20);
        const userMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        const user = new THREE.Mesh(userGeometry, userMaterial);
        user.position.set(25, 2, 45);
        return user;
    },
    userMoves(e, user, scene) {
        switch (e.keyCode) {
            case 37: // Left arrow key
                user.rotateY(0.2); // Rotate left by 0.1 radians
                break;
            case 38: // Up arrow key
                if (user.position.z > 0) { // Check if the user is already at the minimum z-coordinate
                    user.translateZ(-1); // Move forward by 1 unit
                }
                break;
            case 39: // Right arrow key
                user.rotateY(-0.2); // Rotate right by 0.1 radians
                break;
            case 40: // Down arrow key
                if (user.position.z < 50) { // Check if the user is already at the maximum z-coordinate
                    user.translateZ(1); // Move backward by 1 unit
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
    }
    ,

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
    }, grabObject(user, scene) {
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
    }
    ,
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
