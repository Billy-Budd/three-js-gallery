import * as THREE from 'three';

export function createFrame(frame_width, frame_height, frame_color){
    let frame_group = new THREE.Group();
    //scene.add(frame_group);

    //let frame_thick = primary_json.images.border.frame_thick;

    // need to update to variables, but we can do it this way for now

    //const frame_color = 0xffffff;

    frame_width = frame_width + 2;
    frame_height = frame_height + 2;

    const front_bottom = new THREE.Mesh(
	    new THREE.PlaneGeometry(frame_width / 12, 1 / 12),
	    new THREE.MeshStandardMaterial({ color: frame_color,
			side: THREE.DoubleSide}),
    );

    const front_top = new THREE.Mesh(
	    new THREE.PlaneGeometry(frame_width / 12, 1 / 12),
	    new THREE.MeshStandardMaterial({ color: frame_color, 
			side: THREE.DoubleSide}),
    );

    front_top.position.set(0, (frame_height - 1) / 12, 0);

    const front_left = new THREE.Mesh(
	    new THREE.PlaneGeometry(1 / 12, (frame_height - 2) / 12),
	    new THREE.MeshStandardMaterial({ color: frame_color,
			side: THREE.DoubleSide}),
    );

    front_left.position.set((-(frame_width - 1) / 2) / 12,
							((frame_height - 1) / 2) / 12);

    const front_right = new THREE.Mesh(
	    new THREE.PlaneGeometry(1 / 12, (frame_height - 2) / 12),
	    new THREE.MeshStandardMaterial({ color: frame_color,
			side: THREE.DoubleSide}),
    );

    front_right.position.set(((frame_width - 1) / 2) / 12, 
							((frame_height - 1) / 2) / 12);

    const outer_right = new THREE.Mesh(
	    new THREE.PlaneGeometry(1 / 12, frame_height / 12),
	    new THREE.MeshStandardMaterial({ color: frame_color,
			side: THREE.DoubleSide}),
    );

    outer_right.position.set((frame_width / 2) / 12, 
							((frame_height - 1) / 2) / 12, 
							-0.5 / 12);
    outer_right.rotation.y = -Math.PI / 2;

    const outer_left = new THREE.Mesh(
	    new THREE.PlaneGeometry(1 / 12, frame_height / 12),
	    new THREE.MeshStandardMaterial({ color: frame_color, 
			side: THREE.DoubleSide}),
    );

    outer_left.position.set(-(frame_width / 2) / 12, 
							((frame_height - 1) / 2) / 12,
							-0.5 / 12);
    outer_left.rotation.y = -Math.PI / 2;

    const outer_bottom = new THREE.Mesh(
	    new THREE.PlaneGeometry(frame_width / 12, 1 / 12),
	    new THREE.MeshStandardMaterial({ color: frame_color, 
			side: THREE.DoubleSide}),
    );

    outer_bottom.position.set(0, -0.5 / 12, -0.5 / 12);
    outer_bottom.rotation.x = Math.PI / 2;

    const outer_top = new THREE.Mesh(
	    new THREE.PlaneGeometry(frame_width / 12, 1 / 12),
	    new THREE.MeshStandardMaterial({ color: frame_color, 
			side: THREE.DoubleSide}),
    );

    outer_top.position.set(0, (frame_height - 0.5) / 12, -0.5 / 12);
    outer_top.rotation.x = Math.PI / 2;

    const inner_bottom = new THREE.Mesh(
	    new THREE.PlaneGeometry((frame_width - 2) / 12, 1 / 48),
	    new THREE.MeshStandardMaterial({ color: frame_color,
			side: THREE.DoubleSide}),
    );

    inner_bottom.position.set(0, 0.5 / 12, -1 / 96);
    inner_bottom.rotation.x = Math.PI / 2;

    const inner_top = new THREE.Mesh(
	    new THREE.PlaneGeometry((frame_width - 2) / 12, 1 / 48),
	    new THREE.MeshStandardMaterial({ color: frame_color,
			side: THREE.DoubleSide}), 
    );

    inner_top.position.set(0, (frame_height - 1.5) / 12, -1 / 96);
    inner_top.rotation.x = Math.PI / 2;

    const inner_right = new THREE.Mesh(
	    new THREE.PlaneGeometry((frame_height - 2) / 12, 1 / 48),
	    new THREE.MeshStandardMaterial({ color: frame_color,
			side: THREE.DoubleSide}),
    );

    inner_right.position.set(((frame_width - 2) / 2) / 12, ((frame_height - 1) / 2) / 12, -1 / 96);
    inner_right.rotation.x = Math.PI / 2;
    inner_right.rotation.y = Math.PI / 2;

    const inner_left = new THREE.Mesh(
	    new THREE.PlaneGeometry((frame_height - 2) / 12, 1 / 48),
	    new THREE.MeshStandardMaterial({ color: frame_color,
			side: THREE.DoubleSide}),
    );

    inner_left.position.set(-((frame_width - 2) / 2) / 12, ((frame_height - 1) / 2) / 12, -1 / 96);
    inner_left.rotation.x = Math.PI / 2;
    inner_left.rotation.y = Math.PI / 2;

    frame_group.add(front_bottom, outer_bottom, inner_bottom, 
                    front_top, outer_top, inner_top,
                    front_left, outer_left, inner_left,
                    front_right, outer_right, inner_right);

    return frame_group;

}