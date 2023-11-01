import * as THREE from 'three';

import { generateArtData } from './ArtData.js'
import { createFrame } from './Frames.js';

export function createArt(texture_loader, photos_on_1, photos_on_2, photos_on_3, photos_on_4, gallery_width, gallery_length, wall_offset) {
    let arts = [];

    let photos_placed_1 = 1, 
        photos_placed_2 = 1,
        photos_placed_3 = 1,
        photos_placed_4 = 1;

    const art_data = generateArtData();
    
    // create mesh from images, place them, rotate them
    art_data.forEach((data) => {

        const texture = texture_loader.load('images/artworks1/' + data.img_src + '.jpg'); // convert image into texture
        const material = new THREE.MeshBasicMaterial({ map: texture }); // map texture to a material

        // convert material into mesh with proper dimensions
        const art = new THREE.Mesh(
            new THREE.PlaneGeometry((data.size.width / 12), (data.size.height / 12)),
            material
        );

        const frame = createFrame(data.size.width, data.size.height, 0x000000);

        let art_group = new THREE.Group();

        art_group.add(art);
        art_group.add(frame);

        
        // front wall art placement
        if (data.metadata.direction == 1) {

            // custom position check
            if (data.position.custom_position == true) {
                art_group.position.set(data.position.center_in_from_left,         // set x
                                 data.position.center_in_from_eyelevel,     // set y
                                 -((gallery_length / 2) - wall_offset));    // set z - z does not change, this is distance from wall
            }

            // default position
            else {
                art_group.position.set((photos_placed_1 / (photos_on_1 + 1)) * gallery_width - (gallery_width / 2), // set each photo on the wall to be evenly spaced from photographic midpoint
                                  0,                                                                          // set y - set at eyelevel
                               -((gallery_length / 2) - wall_offset));                                        // set z - z does not change, this is distance from wall

                art.position.set(0, 0, -(1 / 96));
                frame.position.set(0, -((data.size.height + 1) / 2) / 12, 0);
            }
            
            photos_placed_1++; // add one to counter, even if this photo is using a custom position, this is required for defaults
        }

        // right wall art placement
        else if (data.metadata.direction == 2) {

            // custom position check
            if (data.position.custom_position == true) {
                art_group.position.set(((gallery_width / 2) - wall_offset),       // set x - x does not change, this is distance from wall
                                   data.position.center_in_from_eyelevel,   // set y
                                   data.position.center_in_from_left);      // set z
            }

            // default position
            else {
                art_group.position.set(((gallery_width / 2) - wall_offset),                                             // set x - x does not change, this is distance from wall
                                   0,                                                                             // set y - set at eyelevel
                                  (photos_placed_2 / (photos_on_2 + 1)) * gallery_length - (gallery_length / 2)); // set z - sets each photo evenly spaced from by photographic midpoint

                art.position.set(0, 0, -(1 / 96));
                frame.position.set(0, -((data.size.height + 1) / 2) / 12, 0);
            }

            photos_placed_2++; // add one to counter, even if this photo is using custom position, it is required for defaults
            art_group.rotation.y = -Math.PI / 2; // rotate 90 degrees in radians
        }

        // back wall art placement
        else if (data.metadata.direction == 3) {

            // custom position check
            if (data.position.custom_position == true) {
                art_group.position.set(-data.position.center_in_from_left,      // set x
                                  data.position.center_in_from_eyelevel,  // set y
                                ((gallery_length / 2) - wall_offset));    // set z - z does not change, this is distance from wall
            }

            // default position
            else {
                art_group.position.set(-((photos_placed_3 / (photos_on_3 + 1)) * gallery_width - (gallery_width / 2)),  // set x - x does not change, this is distance from wall
                                   0,                                                                                     // set y - set at eyelevel
                                  ((gallery_length / 2) - wall_offset));                                                // set z - sets each photo evenly spaced from by photographic midpoint

                art.position.set(0, 0, -(1 / 96));
                frame.position.set(0, -((data.size.height + 1) / 2) / 12, 0);
            }

            photos_placed_3++; // add one to counter, even if this photo is using custom position, it is required for defaults
            art_group.rotation.y = Math.PI; // rotate 180 degrees in radians
        }

        // left wall art placement
        else if (data.metadata.direction == 4) {

            // custom position check
            if (data.position.custom_position == true) {
                art_group.position.set(((gallery_width / 2) - wall_offset), // set x - x does not change, this is distance from wall
                                   data.position.center_in_from_eyelevel,   // set y
                                   data.position.center_in_from_left);      // set z

                
            }

            // default position
            else {
                art_group.position.set(-((gallery_width / 2) - wall_offset),                                             // set x - x does not change, this is distance from wall
                                    0,                                                                             // set y - set at eyelevel
                                   -((photos_placed_4 / (photos_on_4 + 1)) * gallery_length - (gallery_length / 2))); // set z - sets each photo evenly spaced from by photographic midpoint
                    
                art.position.set(0, 0, -(1 / 96));
                frame.position.set(0, -((data.size.height + 1) / 2) / 12, 0);
            }

            photos_placed_4++; // add one to counter, even if this photo is using custom position, it is required for defaults
            art_group.rotation.y = Math.PI / 2; // rotate 90 degrees in radians 
        }

        //let art = art_group.getObjectByName('art__');

        art_group.user_data = {
            type: 'photograph',
            info: data.metadata,
        };

        art.castShadow = true;
        art.receiveShadow = true;

        arts.push(art_group);
    });

    return arts;
};
