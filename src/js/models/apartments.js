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
        const typeApartment = [this.buildLargeApartment(), this.buildSmallApartment, this.buildLongApartment()]

        let x, z;
        let indexTypeApartment = Math.round(Math.random() * 2);

        for (let i = 0; i < nApartments; i++) {
            switch (indexTypeApartment) {
                case 0:
                    do {
                        x = Math.round(Math.random() * 8);
                        z = Math.round(Math.random() * 8);
                    } while (grid[x][z] != "x" && grid[x + 1][z] != "x" && grid[x][z + 1] != "x" && grid[x][z + 1] != "x")
                    break;
                case 1:
                    do {
                        x = Math.round(Math.random() * 8);
                        z = Math.round(Math.random() * 8);
                    } while (grid[x][z] != "x" && grid[x + 1][z] != "x" && grid[x][z + 1] != "x" && grid[x][z + 1] != "x")
                    break;
                case 2:
                    do {
                        x = Math.round(Math.random() * 8);
                        z = Math.round(Math.random() * 8);
                    } while (grid[x][z] != "x" && grid[x + 1][z] != "x" && grid[x][z + 1] != "x" && grid[x][z + 1] != "x")
                    break;
            }
        }
        console.log("index"+indexTypeApartment);
        console.log("x" + x + "y" + z);
        console.log(nApartments);

    }
};


