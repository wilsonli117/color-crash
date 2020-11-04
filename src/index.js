import "./styles/index.scss";
import { Game } from './scripts/game';

document.addEventListener("DOMContentLoaded", () => {
    const bgcanvas = document.getElementById("bgCanvas");
    const gamecanvas = document.getElementById("gameCanvas");
    
    let img = new Image();
    img.src = "./src/background.png"
    let boostIcon = new Image();
    boostIcon.src = "./src/boost.png"

    let game = new Game(bgcanvas, gamecanvas, img, boostIcon);
    let bgMusic = document.getElementById('bgm');
    let mute = document.getElementById('mute');

    mute.addEventListener('click', () => {
        if (bgMusic.muted) {
            bgMusic.muted = false;
        } else {
            bgMusic.muted = true;

        }
    })
    // img.addEventListener('load', game.draw);

    game.start();

    
    
})