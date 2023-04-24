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
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.bias = -0.001;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;

        scene.add(directionalLight);
    },


    addShadowsChildren(scene) {
        let children = scene.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].type === "Mesh") {
                if (children[i].geometry.type === "PlaneGeometry") {
                    children[i].receiveShadow = true;
                } else {
                    children[i].castShadow = true;
                    children[i].receiveShadow = true;
                }
            }
            console.log(children[i].type, children[i].castShadow, children[i].receiveShadow);
        }
    },
}