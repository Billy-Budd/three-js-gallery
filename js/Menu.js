// hides menu
export const hideMenu = () => {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
};

// shows menu
export const showMenu = () => {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
};

// enable controls, hide menu
export const startGallery = (controls) => {
    controls.lock();
    hideMenu();
};

// enable play button to start gallery
export const setupPlayButton = (controls) =>  {
    const play_button = document.getElementById('play_button');
    play_button.addEventListener('click', () => startGallery(controls));
};