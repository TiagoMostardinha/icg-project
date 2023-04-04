import * as THREE from 'three';

export default {
    buildSmallApartment(){
        const boxGeometry = new THREE.BoxGeometry(5,30,5)
        const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        return new THREE.Mesh(boxGeometry,boxMaterial);
    },

    buildLargeApartment(){
        const boxGeometry = new THREE.BoxGeometry(10,20,10)
        const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        return new THREE.Mesh(boxGeometry,boxMaterial);
    },

    buildLongApartment(){
        const boxGeometry = new THREE.BoxGeometry(5,20,10)
        const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        return new THREE.Mesh(boxGeometry,boxMaterial);
    }
};


