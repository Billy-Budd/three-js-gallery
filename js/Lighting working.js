import * as THREE from "three";

export const setupLighting = (scene) => {



}

export function createAmbientLight(color, intensity) {
    const ambient_light = new THREE.AmbientLight(color, intensity);
    return ambient_light;
}

export function createSpotlight(intensity, color, target, height) {
    const spotlight = new THREE.SpotLight(color, intensity);

    spotlight.position.set(target.x - 5, target.x)
}