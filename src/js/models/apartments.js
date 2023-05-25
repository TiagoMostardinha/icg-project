// ************************** //
// Created in: 18/04/2023
// Made By: Tiago Mostardinha
// Project for Introduction of Computer Graphics
// ************************** //

import * as THREE from 'three';

export default {
    buildSmallApartment() {
        const boxGeometry = new THREE.BoxGeometry(5, 30, 5);
      
        const textureLoader = new THREE.TextureLoader();
        const lateralTexture = textureLoader.load('./img/small.png');
      
        const boxMaterial = [
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // right
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // left
          new THREE.MeshPhongMaterial({ color: 0x91420c }), // top
          new THREE.MeshPhongMaterial({ color: 0x91420c }), // bottom
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // front
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // back
        ];
      
        return new THREE.Mesh(boxGeometry, boxMaterial);
      },

    buildLargeApartment() {
        const boxGeometry = new THREE.BoxGeometry(10, 20, 10);
      
        const textureLoader = new THREE.TextureLoader();
        const lateralTexture = textureLoader.load('./img/large.png');
      
        const boxMaterial = [
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // right
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // left
          new THREE.MeshPhongMaterial({ color: 0x8c6a00 }), // top
          new THREE.MeshPhongMaterial({ color: 0x8c6a00 }), // bottom
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // front
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // back
        ];
      
        return new THREE.Mesh(boxGeometry, boxMaterial);
    },

    buildLongApartment() {
        const boxGeometry = new THREE.BoxGeometry(5, 25, 11);
      
        const textureLoader = new THREE.TextureLoader();
        const lateralTexture = textureLoader.load('./img/long.png');
        const frontTexture = textureLoader.load('./img/long2.png');
      
        const boxMaterial = [
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // right
          new THREE.MeshPhongMaterial({ map: lateralTexture }), // left
          new THREE.MeshPhongMaterial({ color: 0x3e5f27 }), // top
          new THREE.MeshPhongMaterial({ color: 0x3e5f27 }), // bottom
          new THREE.MeshPhongMaterial({ map: frontTexture }), // front
          new THREE.MeshPhongMaterial({ map: frontTexture }), // back
        ];
      
        return new THREE.Mesh(boxGeometry, boxMaterial);
    },

    generateScenario(scene, grid) {
        const typeApartment = [this.buildLargeApartment(), this.buildSmallApartment(), this.buildLongApartment()];
        let nApartments = Math.round(Math.random() * 3 + 2);

        for (let i = 0; i < nApartments; i++) {
            let indexTypeApartment = Math.round(Math.random() * 2);
            let object = typeApartment[indexTypeApartment].clone();

            let x, z;
            let isValidPosition = false;

            while (!isValidPosition) {
                switch (indexTypeApartment) {
                    case 0:
                        x = Math.floor(Math.random() * 8);
                        z = Math.floor(Math.random() * 8);

                        if (
                            grid[z][x] == "x" &&
                            grid[z + 1][x] == "x" &&
                            grid[z][x + 1] == "x" &&
                            grid[z + 1][x + 1] == "x"
                        ) {
                            // update grid
                            grid[z][x] = "a";
                            grid[z + 1][x] = "a";
                            grid[z][x + 1] = "a";
                            grid[z + 1][x + 1] = "a";

                            object.position.set(x * 5 + 5, 10, z * 5 + 5);
                            isValidPosition = true;
                        }
                        break;
                    case 1:
                        x = Math.floor(Math.random() * 8);
                        z = Math.floor(Math.random() * 8);

                        if (grid[z][x] == "x") {
                            // update grid
                            grid[z][x] = "a";

                            object.position.set(x * 5 + 2.5, 15, z * 5 + 2.5);
                            isValidPosition = true;
                        }
                        break;
                    case 2:
                        x = Math.floor(Math.random() * 8);
                        z = Math.floor(Math.random() * 6);

                        if (
                            grid[z][x] == "x" &&
                            grid[z][x + 1] == "x" &&
                            grid[z][x + 2] == "x"
                        ) {
                            // update grid
                            grid[z][x] = "a";
                            grid[z + 1][x] = "a";
                            grid[z + 2][x] = "a";

                            object.position.set(x * 5 + 2.5, 12.5, z * 5 + 7.5);
                            isValidPosition = true;
                        }
                        break;
                }
            }

            object.name = "apartment";
            scene.add(object);
        }

        return grid;
    }
}

