import * as THREE from 'three';

export const setupFloor = (scene, texture_loader, floor_width, floor_length, floor_depth) => {

    const floor_texture = texture_loader.load('images/floor.jpg');  // load texture
    floor_texture.wrapS = THREE.RepeatWrapping;                     // horizontal wrap
    floor_texture.wrapT = THREE.RepeatWrapping;                     // vertical wrap
    floor_texture.repeat.set(floor_width / 8, floor_length / 8);    // repeat texture (width, height)

    // create geometry for floor (width, height)
    const plane_geometry = new THREE.PlaneGeometry(floor_width, floor_length); 

    // create material from texture to apply to geometry
    const plane_material = new THREE.MeshPhongMaterial({
        map: floor_texture,
        side: THREE.DoubleSide,
    });

    // create mesh
    const floor_plane = new THREE.Mesh(plane_geometry, plane_material);

    floor_plane.rotation.x = Math.PI / 2;   // make plane horizontal (radians)
    floor_plane.position.y = -floor_depth;  // lower floor so eye level can stay at 0

    scene.add(floor_plane);
};