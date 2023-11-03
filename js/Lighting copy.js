import * as THREE from 'three';

export const setupLighting = (scene) => {

    const ambient_light = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambient_light);

    function createSpotlight(x, y, z, intensity, target_position, color) {
        const spotlight = new THREE.SpotLight(color, intensity);
        spotlight.position.set(x, y, z);
        spotlight.target.position.copy(target_position);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI / 3;
        spotlight.penumbra = 0.5;
        spotlight.decay = 0.5;
        spotlight.distance = 40;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        return spotlight;
    }

    const spotlight1 = createSpotlight(0, 20, -10, 5, new THREE.Vector3(0, 2, -25), 0xffffff);
    const spotlight2 = createSpotlight(0, 20, 10, 5, new THREE.Vector3(0, 2, 25), 0xffffff);
    const spotlight3 = createSpotlight(-10, 20, 0, 5, new THREE.Vector3(-25, 2, 0), 0xffffff);
    const spotlight4 = createSpotlight(10, 20, 0, 5, new THREE.Vector3(25, 2, 0), 0xffffff);

    scene.add(spotlight1, spotlight2, spotlight3, spotlight4);
  
    scene.add(spotlight1.target, spotlight2.target, spotlight3.target, spotlight4.target);
};