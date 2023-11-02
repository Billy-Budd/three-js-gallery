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

    const secondary_frame_color = 0x000000;
    
    // create mesh from images, place them, rotate them
    art_data.forEach((data) => {

        const texture = texture_loader.load('images/artworks1/' + data.img_src + '.jpg'); // convert image into texture
        const material = new THREE.MeshBasicMaterial({ map: texture }); // map texture to a material

        // convert material into mesh with proper dimensions
        const art = new THREE.Mesh(
            new THREE.PlaneGeometry((data.size.width / 12), (data.size.height / 12)),
            material
        );

        let frame = new THREE.Object3D;

        if (data.border.frame_width == 0 || data.border.frame_width == null ||
            data.border.frame_height == 0 || data.border.frame_height == null) {

            if (data.border.frame == false) {

                if (data.size.width < 20 && data.size.height < 16) {
                    console.log("Photo had no default frame size and fits 20x16");
                    frame = createFrame(20, 16, data.border.frame_color, secondary_frame_color);

                    data.border.frame_width = 20;
                    data.border.frame_height = 16;
                }
    
                else if (data.size.width < 16 && data.size.height < 20 ) {
                    console.log("Photo had no default frame size and fits 16x20");
                    frame = createFrame(16, 20, data.border.frame_color, secondary_frame_color);

                    data.border.frame_width = 16;
                    data.border.frame_height = 20;
                }
    
                else if (data.size.width < 36 && data.size.height < 24) {
                    console.log("Photo had no default frame size and fits 36x24");
                    frame = createFrame(36, 24, data.border.frame.frame_color, secondary_frame_color);

                    data.border.frame_width = 36;
                    data.border.frame_height = 24;
                }

                else if (data.size.width < 24 && data.size.height < 36) {
                    console.log("Photo had no default frame size and fits 24x36");
                    frame = createFrame(24, 36, data.border.frame_color, secondary_frame_color);

                    data.border.frame_width = 24;
                    data.border.frame_height = 36;
                }

                else {
                    console.log("Photo had no default frame size and exceeds normal size bounds");
                    frame = createFrame(data.size.width + 3, data.size.height + 3, data.border.frame_color, secondary_frame_color);

                    data.border.frame_width = data.size.width + 3;
                    data.border.frame_height = data.size.height + 3;
                }
            }

            else if (data.border.frame == true) {
                console.log("Photo frame is in a nonexsitent state, yet this value is true. Creating frame anyways.");
                frame = createFrame(data.border.frame_width, data.border.frame_height, data.border.frame_color, secondary_frame_color);
            } 
        }

        else if (data.border.frame == true) {
            console.log("Photo had a ")
            frame = createFrame(data.border.frame_width, data.border.frame_height, data.border.frame_color, secondary_frame_color);
        }

        else {
            console.log("Frame did not follow normal conventions. Attempting to create frame using stored values");
            try {
                frame = createFrame(data.border.frame_width, data.border.frame_height, data.border.frame_color, secondary_frame_color);
            }

            catch(error) {
                frame = createFrame(40, 40, 0x444444, 0x000000);
            }
            
        }

        
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
                frame.position.set(0, -((data.border.frame_height + 1) / 2) / 12, 0);
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
                frame.position.set(0, -((data.border.frame_height + 1) / 2) / 12, 0);
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
                frame.position.set(0, -((data.border.frame_height + 1) / 2) / 12, 0);
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
                frame.position.set(0, -((data.border.frame_height + 1) / 2) / 12, 0);
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
