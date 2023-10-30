import * as THREE from 'three';
import primary_json from '../example.json' assert { type: "json" };

export function createFrame(art_width, art_height, frame_width, frame_height, frame_depth){
    let frame_group = new THREE.Group();
    scene.add(frame_group);

    //let frame_thick = primary_json.images.border.frame_thick;

    // need to update to variables, but we can do it this way for now
    const outer_bottom = new THREE.Mesh(
        new THREE.PlaneGeometry(frame_width / 12, 1 / 12),
        new THREE.MeshBasicMaterial({ color: 0x000000,
            side: THREE.DoubleSide}),
    );

    const outer_top = new THREE.Mesh(
        new THREE.PlaneGeometry(frame_width, 1 / 12),
        new THREE.MeshBasicMaterial({ color: 0x000000, 
            side: THREE.DoubleSide}),
    );
    
    outer_top.position.set(0, )


}