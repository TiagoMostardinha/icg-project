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

        this.chooseTarget(scene);
    },

    chooseTarget(scene) {
        // Define the boundaries of the inner 8x8 square
        const minX = 1;
        const maxX = 8;
        const minZ = 1;
        const maxZ = 8;

        // Find a random position within the inner 8x8 square
        let x, z;
        x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        z = Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ;

        // Mark the selected plane segment as the target
        const planeSegmentIndex = (z - 1) * 10 + (x - 1);
        const planeSegment = this.planeSegments[planeSegmentIndex];
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        planeSegment.material = material;
        scene.add(planeSegment);

        // Keep track of the selected target
        this.targetX = x;
        this.targetZ = z;
    },
}
