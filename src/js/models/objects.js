import * as THREE from 'three';

export default {
    object1(){
        const obj1Geometry = new THREE.SphereGeometry(2,30,5)
        const obj1Material = new THREE.MeshBasicMaterial({color: 0xff00ff});
        return new THREE.Mesh(obj1Geometry,obj1Material);
    },
    object2(){
        const obj2Geometry = new THREE.SphereGeometry(2,30,5)
        const obj2Material = new THREE.MeshBasicMaterial({color: 0xffff00});
        return new THREE.Mesh(obj2Geometry,obj2Material);
    }
};

