import "./styles/index.scss";
import { Game } from './scripts/game';

document.addEventListener("DOMContentLoaded", () => {
    const bgcanvas = document.getElementById("bgCanvas");
    const gamecanvas = document.getElementById("gameCanvas");
    
    let img = new Image();
    img.src = "./src/images/background.png"
    let boostIcon = new Image();
    boostIcon.src = "./src/images/boost.png"

    let game = new Game(bgcanvas, gamecanvas, img, boostIcon);
    let bgMusic = document.getElementById('bgm');
    let mute = document.getElementById('mute');

    mute.addEventListener('click', () => {
        if (bgMusic.muted) {
            bgMusic.muted = false;
            mute.textContent = 'Mute Music'
        } else {
            bgMusic.muted = true;
            mute.textContent = 'Unmute Music'
        }
    })

    img.addEventListener('load', game.start);

    // game.start();
    
    
})