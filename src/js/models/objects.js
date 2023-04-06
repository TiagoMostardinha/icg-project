import * as THREE from 'three';

export default {
    object1() {
        const obj1Geometry = new THREE.SphereGeometry(2, 30, 5)
        const obj1Material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
        return new THREE.Mesh(obj1Geometry, obj1Material);
    },
    // object2() {
    //     const obj2Geometry = new THREE.SphereGeometry(2, 30, 5)
    //     const obj2Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    //     return new THREE.Mesh(obj2Geometry, obj2Material);
    // },

    placeObjects(scene, grid) {
        let count = grid.reduce((acc, row) => {
            return acc + row.filter(cell => cell === "t").length;
        }, 0);

        count += Math.random(Math.random())

        let object =null;

        for (let i = 0; i < count; i++) {
            let x, z;
            let isValidPosition = false;
            while(!isValidPosition){
                x = Math.floor(Math.random() * 9);
                z = Math.floor(Math.random() * 9);

                if (grid[z][x] == "x") {
                    object = this.object1().clone();
                    object.position.set(x * 5+2.5, 2, z * 5+2.5);
                    
                    isValidPosition = true;
                    console.log("x",x,"z", z)
                }
            }
            scene.add(object);
        }
    }
};

