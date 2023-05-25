// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinha
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';

export default {
    object1() {
        const radius = 1.5;
        const height = 0.5;
        const segments = 32;
      
        const geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
        const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
      
        // Load an image texture and apply it to the material's map property
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./img/coin.png');
        material.map = texture;
      
        let coin = new THREE.Mesh(geometry, material);

        coin.rotation.x = Math.PI / 2;
      
        return coin;
    },

    placeObjects(scene, grid) {
        let listObjects = [];
        let count = grid.reduce((acc, row) => {
            return acc + row.filter(cell => cell === "t").length;
        }, 0);

        count += Math.random(Math.random())

        let object = null;

        for (let i = 0; i < count; i++) {
            let x, z;
            let isValidPosition = false;
            while (!isValidPosition) {
                x = Math.floor(Math.random() * 9);
                z = Math.floor(Math.random() * 9);

                if (grid[z][x] == "x") {
                    object = this.object1().clone();
                    object.position.set(x * 5 + 2.5, 2, z * 5 + 2.5);

                    isValidPosition = true;
                    listObjects.push(object);
                }
            }
            object.name = "target";
            scene.add(object);

        }
        return listObjects;
    },

    checkLevelComplete(grid, listObjects) {
        const targetPositions = [];

        // find all the positions of "t" in the grid
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === "t") {
                    targetPositions.push({ x: j, z: i });
                }
            }
        }

        // check if each "t" has an object in it
        for (let targetPos of targetPositions) {
            let found = false;
            for (let obj of listObjects) {
                if (obj.position.x >= targetPos.x * 5 && obj.position.x < targetPos.x * 5 + 5 &&
                    obj.position.z >= targetPos.z * 5 && obj.position.z < targetPos.z * 5 + 5) {
                    found = true;

                    break;
                }
            }
            if (!found) {
                return false; // if a target has no object in it, return false
            }
        }

        return true; // if all targets have objects in them, return true
    }


};

