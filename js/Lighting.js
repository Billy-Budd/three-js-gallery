import * as THREE from "three";

export function createAmbientLight(color, intensity) {
    const ambient_light = new THREE.AmbientLight(color, intensity);
    return ambient_light;
}

export function createSpotlight(intensity, color, art_vector, gallery_height) {
    const spotlight = new THREE.SpotLight(color, intensity);

    spotlight.position.set(art_vector.x - 5, gallery_height - (1 / 12), art_vector.z);
    spotlight.target.position.copy(art_vector);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 0.2;
    spotlight.decay = 0;
    //spotlight.distance = Math.sqrt(art_vector.x * art_vector.x + gallery_height * gallery_height);
    spotlight.distance = 40;
    return spotlight;
}