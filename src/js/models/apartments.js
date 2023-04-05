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
        const boxGeometry = new THREE.BoxGeometry(5, 20, 10)
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        return new THREE.Mesh(boxGeometry, boxMaterial);
    },

    generateScenario(scene, grid) {
        let nApartments = Math.round(Math.random() * 3 + 1);
        const typeApartment = [this.buildLargeApartment(), this.buildSmallApartment, this.buildLongApartment()];

        for (let i = 0; i < 1; i++) {
            let indexTypeApartment = Math.round(Math.random() * 2);
            let object = typeApartment[indexTypeApartment];
            
            switch (indexTypeApartment) {
                case 0:
                    do {
                        x = Math.round(Math.random() * 8);
                        z = Math.round(Math.random() * 8);
                    } while (grid[x][z] != "x" && grid[x + 1][z] != "x" && grid[x][z + 1] != "x" && grid[x][z + 1] != "x");

                    // update grid
                    grid[x][z] = "a";
                    grid[x + 1][z] = "a";
                    grid[x][z + 1] = "a";
                    grid[x+1][z + 1] = "a";

                    // build in scenario

                    break;
                case 1:
                    do {
                        x = Math.round(Math.random() * 8);
                        z = Math.round(Math.random() * 8);
                    } while (grid[x][z] != "x" && grid[x + 1][z]);

                    // update grid
                    grid[x][z] = "a";

                    // build in scenario

                    break;
                case 2:
                    do {
                        x = Math.round(Math.random() * 8);
                        z = Math.round(Math.random() * 8);
                    } while (grid[x][z] != "x" && grid[x][z + 1] != "x" && grid[x][z + 2] != "x");

                    // update grid
                    grid[x][z] = "a";
                    grid[x][z + 1] = "a";
                    grid[x][z + 2] = "a";

                    //build in scenario

                    break;
                    
            }
            console.log("x" + x + "y" + z);
        }
        console.log("index" + indexTypeApartment);
        console.log(nApartments);
        console.log(grid);

    }
};


