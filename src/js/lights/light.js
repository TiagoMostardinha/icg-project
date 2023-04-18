// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinhaa
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';

export default {
    addAmbientLight(scene) {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    },

    addDirectionalLight(scene) {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(50, 80, 50);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
    }
}