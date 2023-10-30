import primary_json from '../example.json' assert { type: "json" };


export function generateArtData() {

    const art_data = [];

    primary_json.images.forEach((image) => {

        const item = {

            img_src: image.image_id,

            position: {
                x: image.position.center_in_from_left,
                y: image.position.center_in_from_eyelevel,
                z: image.position.center_in_from_left,
                custom_position: image.position.custom_position
            },

            size: {
                width: image.size.width,
                height: image.size.height
            },

            border: {

                matte: {
                    width: image.border.matte.custom_width,
                    height: image.border.matte.custom_height
                },

                frame: image.border.frame,
                frame_thick: image.border.frame_thick
            },

            metadata: {
                title: image.metadata.title,
                artist: image.metadata.artist,
                description: image.metadata.description,
                year: image.metadata.year,
                medium: image.metadata.medium,
                additional_information: image.metadata.additional_information,
                direction: image.metadata.direction
            }
        };

        art_data.push(item);
    });

    return art_data;
}