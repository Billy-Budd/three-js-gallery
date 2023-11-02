import * as THREE from 'three';
import primary_json from '../example.json' assert { type: "json" };
import { displayArtInfo, hideArtInfo } from './ArtInfo.js';
import { updateMovement } from './Movement.js';

export const setupRendering = (
    scene, 
    camera,
    renderer,
    art,
    controls,
    walls
) => {

    // create clock for accurate and fluid movement
    const clock = new THREE.Clock();

    // main render function, allows the scene to keep updating as player moves
    let render = function () {

        // get delta for accurate movement
        const delta = clock.getDelta();
        
        // update position as player moves
        updateMovement(delta, controls, camera, walls);

        const distance_threshold = Math.sqrt((primary_json.size.width_ft + primary_json.size.height_ft) / 2);

        let art_to_show;

        
        art.forEach((art) => {
            
            const distance_to_art = camera.position.distanceTo(art.position);

            if (distance_to_art < distance_threshold) {
                art_to_show = art;
                document.addEventListener('mousedown', function() {
                    //console.log("clicked!");

                    if (art.metadata.direction == 1) {
                        console.log("thisworked")
                    }

                    camera.position.set(art.position.x - distance_threshold,0,art.position.z - distance_threshold);
                });
            }

            
        });

        if (art_to_show) {
            displayArtInfo(art_to_show.user_data.info);
        }

        else {
            hideArtInfo();
        }

        renderer.render(scene, camera);     // recursive loop to continue rendering
        requestAnimationFrame(render);
    };

    render();
};