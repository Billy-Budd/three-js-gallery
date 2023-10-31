import * as THREE from 'three';
import primary_json from '../example.json' assert { type: "json" };

import { scene, setupScene, animate, addObjectsToScene } from './Scene.js';
import { createArt } from './Art.js';
import { setupWalls } from './Walls.js';
import { setupLighting } from './Lighting.js';
import { setupFloor } from './Floor.js';
import { setupCeiling } from './Ceiling.js';
import { createBoundingBoxes } from './BoundingBox.js';
import { setupRendering } from './Render.js';
import { setupEventListeners } from './EventListener.js';
import { setupPlayButton } from './Menu.js';


let { camera, controls, renderer } = setupScene();

const texture_loader = new THREE.TextureLoader();

let gallery_width = primary_json.size.width_ft,   // units total in left and right directions of (0, 0, 0)
    gallery_length = primary_json.size.length_ft,  // units total in forward and back directions of (0, 0, 0)
    gallery_height = primary_json.size.height_ft - 5,  // height of gallery from (0,0,0)
    gallery_depth = 5,    // depth of gallery from (0,0,0)
    wall_offset = 1/12; // 1 inch (1/12 of a unit) so art is 1 inch off the wall for frames

// checking if JSON was read correctly
console.log(primary_json);
console.log("Gallery Height Total: ", gallery_height+gallery_depth,
			"Gallery Width: ", gallery_width,
			"Gallery Length: ", gallery_length);

// create gallery bounds
const walls = setupWalls(scene, texture_loader, gallery_width, gallery_length, gallery_height, gallery_depth);
const floor = setupFloor(scene, texture_loader, gallery_width, gallery_length, gallery_depth);
const ceiling = setupCeiling(scene, texture_loader, gallery_width, gallery_length, gallery_height);



let number_of_photos = 0, 
    photos_on_1 = 0,
    photos_on_2 = 0,
    photos_on_3 = 0,
    photos_on_4 = 0;

primary_json.images.forEach((image) => {
	if (image.metadata.direction == 1) { photos_on_1++; }
	else if (image.metadata.direction == 2) { photos_on_2++; }
	else if (image.metadata.direction == 3) { photos_on_3++; }
	else if (image.metadata.direction == 4) { photos_on_4++; }
})

console.log("photo_1:", photos_on_1, 
			"photo_2:", photos_on_2,
			"photo_3:", photos_on_3,
			"photo_4:", photos_on_4);

	const art = createArt(texture_loader, photos_on_1, photos_on_2, photos_on_3, photos_on_4, gallery_width, gallery_length, wall_offset);

const lighting = setupLighting(scene);

/*
const frame1 = new THREE.Mesh(
	new THREE.PlaneGeometry(20/12, 1/12),
	new THREE.MeshStandardMaterial({ color: 0xff00f0,
		side: THREE.DoubleSide}),
);  
const frame2 = new THREE.Mesh(
	new THREE.PlaneGeometry(20/12, 1/12),
	new THREE.MeshStandardMaterial({ color: 0x000000,
		side: THREE.DoubleSide}),
);  

frame2.position.set(0, 15/12, 0);
const frame3 = new THREE.Mesh(
	new THREE.PlaneGeometry(1/12, 14/12),
	new THREE.MeshStandardMaterial({ color: 0x00ff00,
		side: THREE.DoubleSide}),
); 
const frame4 = new THREE.Mesh(
	new THREE.PlaneGeometry(1/12, 14/12),
	new THREE.MeshStandardMaterial({ color: 0xff0000,
		side: THREE.DoubleSide}),
);  

const frame5 = new THREE.Mesh(
	new THREE.PlaneGeometry(1/12, 16/12),
	new THREE.MeshStandardMaterial({ color: 0xffff00,
		side: THREE.DoubleSide}),
);  

const frame6 = new THREE.Mesh(
	new THREE.PlaneGeometry(1/12, 16/12),
	new THREE.MeshStandardMaterial({ color: 0xff0000,
		side: THREE.DoubleSide}),
);  



frame3.position.set(-9.5/12, 7.5/12, 0);
frame4.position.set(9.5/12, 7.5/12, 0);
frame5.position.set(10/12, 7.5/12, -0.5/12);
frame5.rotation.y = -Math.PI / 2;

frame6.position.set(-10/12, 7.5/12, -0.5/12);
frame6.rotation.y = -Math.PI / 2;


const frame7 = new THREE.Mesh(
	new THREE.PlaneGeometry(20/12, 1/12),
	new THREE.MeshStandardMaterial({ color: 0x00ffff,
		side: THREE.DoubleSide}),
);  
const frame8 = new THREE.Mesh(
	new THREE.PlaneGeometry(20/12, 1/12),
	new THREE.MeshStandardMaterial({ color: 0x0000ff,
		side: THREE.DoubleSide}),
);  

const frame9 = new THREE.Mesh(
	new THREE.PlaneGeometry(18/12, 1/48),
	new THREE.MeshStandardMaterial({ color: 0xffff00,
	side: THREE.DoubleSide})
);

frame9.rotation.x = Math.PI/2;
frame9.position.set(0, 0.5/12, -1/96);

const frame10 = new THREE.Mesh(
	new THREE.PlaneGeometry(18/12, 1/48),
	new THREE.MeshStandardMaterial({ color: 0xff00ff,
	side: THREE.DoubleSide})
);

frame10.rotation.x = Math.PI/2;
frame10.position.set(0, 14.5/12, -1/96);


const frame11 = new THREE.Mesh(
	new THREE.PlaneGeometry(14/12, 1/48),
	new THREE.MeshStandardMaterial({ color: 0x00ff00,
	side: THREE.DoubleSide})
);

frame11.rotation.x = Math.PI/2;
frame11.rotation.y = Math.PI/2;
frame11.position.set(9/12,7.5/12,-1/96);

const frame12 = new THREE.Mesh(
	new THREE.PlaneGeometry(14/12, 1/48),
	new THREE.MeshStandardMaterial({ color: 0x0000ff,
	side: THREE.DoubleSide})
);

frame12.rotation.x = Math.PI/2;
frame12.rotation.y = Math.PI/2;
frame12.position.set(-9/12,7.5/12,-1/96);

frame8.position.set(0, 15.5/12, -0.5/12);
frame7.position.set(0, -0.5/12, -0.5/12);
frame7.rotation.x = Math.PI/2;
frame8.rotation.x = Math.PI/2;

scene.add(frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8, frame9, frame10, frame11, frame12);
*/

createBoundingBoxes(walls);

setupPlayButton(controls);
setupEventListeners(controls);

addObjectsToScene(scene, art);

setupRendering(scene, camera, renderer, art, controls, walls);