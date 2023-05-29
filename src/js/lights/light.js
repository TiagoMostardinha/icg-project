// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinha
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';

let color;

export default {
    buildSkybox(scene) {
        if (Math.random() > 0.1) {
            color = 0xffffff;
            const loader = new THREE.CubeTextureLoader();
            loader.setPath('./img/');
            const texture = loader.load([
                'clouds.jpg',
                'clouds.jpg',
                'clouds.jpg',
                'clouds.jpg',
                'clouds.jpg',
                'clouds.jpg'
            ]);
            scene.background = texture;
            
        } else {
            color = 0x000000;
            const loader = new THREE.CubeTextureLoader();
            loader.setPath('./img/');
            const texture = loader.load([
                'night.jpg',
                'night.jpg',
                'night.jpg',
                'night.jpg',
                'night.jpg',
                'night.jpg'
            ]);
            scene.background = texture;
            
        }
    },

    addAmbientLight(scene) {
        const ambientLight = new THREE.AmbientLight(color, 0.5);
        scene.add(ambientLight);
    },

    addDirectionalLight(scene) {
        const directionalLight = new THREE.DirectionalLight(color, 0.5);
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
        }
    },
}