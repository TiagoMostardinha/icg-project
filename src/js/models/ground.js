import * as THREE from 'three';

export default {
    buildGround(scene, grid) {
        const planeWidth = 50;
        const planeLength = 50;
        const planeSegments = 10;
        const segmentWidth = planeWidth / planeSegments;
        const segmentLength = planeLength / planeSegments;

        this.planeSegments = []; // Define an array to hold the plane segment meshes

        for (let i = 0; i < planeSegments; i++) {
            for (let j = 0; j < planeSegments; j++) {
                const planeSegmentGeometry = new THREE.PlaneGeometry(segmentWidth, segmentLength, 1, 1);

                let planeSegmentMaterial;
                if ((i + j) % 2 === 0) {
                    planeSegmentMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                } else {
                    planeSegmentMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
                }

                const planeSegment = new THREE.Mesh(planeSegmentGeometry, planeSegmentMaterial);
                const segmentX = i * segmentWidth + segmentWidth / 2;
                const segmentZ = j * segmentLength + segmentLength / 2;
                planeSegment.position.set(segmentX, 0, segmentZ);
                planeSegment.rotation.set(-0.5 * Math.PI, 0, 0);
                scene.add(planeSegment);

                // Add the plane segment mesh to the array
                this.planeSegments.push(planeSegment);
            }
        }

        return this.chooseTarget(scene,grid);
    },

    chooseTarget(scene, grid) {
        let x, z;
        do {
            x = Math.floor(Math.random() * 9);
            z = Math.floor(Math.random() * 9);
        } while (grid[z][x] != "x");

        grid[z][x] = "t";

        // Mark the selected plane segment as the target
        const targetGeometry = new THREE.PlaneGeometry(5, 5, 1, 1);
        const targetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const target = new THREE.Mesh(targetGeometry, targetMaterial);
        target.rotation.set(-0.5 * Math.PI, 0, 0);
        target.position.set(x * 5 + 2.5, 0.1, z * 5 + 2.5);
        scene.add(target);

        console.log("TARGET",grid);
        return grid
    },
}
