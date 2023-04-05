import * as THREE from 'three';

let inventory = [];


export default {
    userMoves(e, user, scene) {
        switch (e.keyCode) {
            case 37: // Left arrow key
                user.rotateY(0.1); // Rotate left by 0.1 radians
                break;
            case 38: // Up arrow key
                user.translateZ(-1); // Move forward by 1 unit
                break;
            case 39: // Right arrow key
                user.rotateY(-0.1); // Rotate right by 0.1 radians
                break;
            case 40: // Down arrow key
                user.translateZ(1); // Move backward by 1 unit
                break;
            case 71: // G key
                this.grabObject(user, scene);
                break;
            case 80: // P key
                this.placeObject(user, scene);
                break;
        }
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
                // You can add your logic here for what to do in this case
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
        inventory.push(object);
        scene.remove(object);
    },

    placeObject(user, scene) {
        // Check if there is an object in front of the user
        let object = inventory.pop();
        if (this.userHasObjectInFront(user, scene) !== false) {
            console.log("No object in front to place.");
            return;
        }
        // Perform placing logic here
        console.log("Has an object in front to place.");
        // Set the position of the object in front of the user
        const userDirection = new THREE.Vector3();
        user.getWorldDirection(userDirection);
        const objectPosition = user.position.clone().addScaledVector(userDirection, 3); // Place the object 3 units in front of the user
        object.position.copy(objectPosition);
        scene.add(object);
    }

}
