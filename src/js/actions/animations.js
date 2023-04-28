import * as THREE from 'three';

let rotationSpeed = 0.05;
let yOffset = 2;

export default {
    animateCoin(scene) {
        for (let i = 0; i < scene.children.length; i++) {
            if (scene.children[i].name == "target") {
                scene.children[i].rotation.z += rotationSpeed;

                // Move cylinder up and down
                scene.children[i].position.y = yOffset + (Math.sin(Date.now() * 0.005) * 0.3);
            }
        }
    }
};