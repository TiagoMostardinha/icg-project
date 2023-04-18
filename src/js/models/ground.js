import * as THREE from 'three';

export default {
    buildGround(scene, grid) {
        const planeSegmentGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
        let planeSegmentMaterial = new THREE.MeshBasicMaterial({ color: 0x74855c });
        const planeSegment = new THREE.Mesh(planeSegmentGeometry, planeSegmentMaterial);
        planeSegment.position.set(25, 0, 25);
        planeSegment.rotation.set(-0.5 * Math.PI, 0, 0);
        scene.add(planeSegment);

        return grid;
    },

    chooseTarget(scene, grid) {
        let x, z;
        const nTargets = Math.round(Math.random() + 1);
        const textureLoader = new THREE.TextureLoader();

        for (let i = 0; i < nTargets; i++) {
            let targetFound = false;
            while (!targetFound) {
                x = Math.floor(Math.random() * 10);
                z = Math.floor(Math.random() * 10);
                if (grid[z][x] === "x") {
                    targetFound = true;
                    grid[z][x] = "t";
                    const texture = textureLoader.load('./img/target.jpg', () => {
                        // Once the texture is loaded, create the ground plane
                        const targetGeometry = new THREE.PlaneGeometry(5, 5,1,1);
                        const targetMaterial = new THREE.MeshBasicMaterial({ map: texture });
                        const target = new THREE.Mesh(targetGeometry, targetMaterial);
                        target.rotation.set(-0.5 * Math.PI, 0, 0);
                        target.position.set(x * 5 + 2.5, 0.1, z * 5 + 2.5);
                        scene.add(target);
                    });
                }
            }
        }
        return grid;
    }
}
