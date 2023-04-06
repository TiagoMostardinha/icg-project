import * as THREE from 'three';

export default {
    buildSmallApartment() {
        const boxGeometry = new THREE.BoxGeometry(5, 30, 5)
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        return new THREE.Mesh(boxGeometry, boxMaterial);
    },

    buildLargeApartment() {
        const boxGeometry = new THREE.BoxGeometry(10, 20, 10)
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        return new THREE.Mesh(boxGeometry, boxMaterial);
    },

    buildLongApartment() {
        const boxGeometry = new THREE.BoxGeometry(5, 25, 15)
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
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

<<<<<<< HEAD
                    object.position.set(x * 5+2.5,15,z * 5+2.5);
                    break;
                case 2:
                    do {
                        x = Math.round(Math.random() * 8);
                        z = Math.round(Math.random() * 7);
                    } while (grid[z][x] != "x" && grid[z][x + 1] != "x" && grid[z][x + 2] != "x" && grid[z][x] != "u" && grid[z][x + 1] != "u" && grid[z][x + 2] != "u" && grid[z][x] != "t" && grid[z][x + 1] != "t" && grid[z][x + 2] != "t");

                    // update grid
                    grid[z][x] = "a";
                    grid[z+1][x] = "a";
                    grid[z+2][x] = "a";

                    object.position.set(x * 5+2.5,10,z * 5+7.5);
                    break;
=======
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
>>>>>>> restructure_init

                            object.position.set(x * 5 + 2.5, 12.5, z * 5 + 7.5);
                            isValidPosition = true;
                        }
                        break;
                }
            }

            scene.add(object);
        }

        return grid;
    }
}

