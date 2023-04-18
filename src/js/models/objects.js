import * as THREE from 'three';

export default {
    object1() {
        const obj1Geometry = new THREE.SphereGeometry(2, 30, 5)
        const obj1Material = new THREE.MeshStandardMaterial({ color: 0xff00ff });
        let obj = new THREE.Mesh(obj1Geometry, obj1Material);
        obj.castShadow = true;
        obj.receiveShadow = true;
        return obj;
    },
    // object2() {
    //     const obj2Geometry = new THREE.SphereGeometry(2, 30, 5)
    //     const obj2Material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    //     return new THREE.Mesh(obj2Geometry, obj2Material);
    // },

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

            console.log(object);
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

