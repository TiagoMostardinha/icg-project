// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinha
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';

const size = 50;

export default {
    buildGround(scene, grid) {
        const planeSegmentGeometry = new THREE.PlaneGeometry(size, size, 1, 1);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./img/ground.jpg');

        let planeSegmentMaterial = new THREE.MeshPhongMaterial({ map: texture });
        const planeSegment = new THREE.Mesh(planeSegmentGeometry, planeSegmentMaterial);
        planeSegment.position.set(size/2, 0, size/2);
        planeSegment.rotation.set(-0.5 * Math.PI, 0, 0);
        scene.add(planeSegment);

        return grid;
    },

    chooseTarget(scene, grid) {
        let x, z;
        const nTargets = Math.round(Math.random() + 1);

        for (let i = 0; i < nTargets; i++) {
            let targetFound = false;
            while (!targetFound) {
                x = Math.floor(Math.random() * 10);
                z = Math.floor(Math.random() * 10);
                if (grid[z][x] === "x") {
                    targetFound = true;
                    grid[z][x] = "t";
                    // Once the texture is loaded, create the ground plane
                    const targetGeometry = new THREE.PlaneGeometry(5, 5, 1, 1);

                    const textureLoader = new THREE.TextureLoader();
                    const texture = textureLoader.load('./img/target.png');

                    const targetMaterial = new THREE.MeshPhongMaterial({ map: texture });
                    const target = new THREE.Mesh(targetGeometry, targetMaterial);
                    target.rotation.set(-0.5 * Math.PI, 0, 0);
                    target.position.set(x * 5 + 2.5, 0.1, z * 5 + 2.5);
                    scene.add(target);
                }
            }
        }
        return grid;
    }
}
