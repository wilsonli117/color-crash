import "./styles/index.scss";
import { Game } from './scripts/game';

document.addEventListener("DOMContentLoaded", () => {
    const bgcanvas = document.getElementById("bgCanvas");
    const gamecanvas = document.getElementById("gameCanvas");
    
    let img = new Image();
    img.src = "./src/background.png"

    let game = new Game(bgcanvas, gamecanvas, img);
    // img.addEventListener('load', game.draw);

    game.start();

    
    
})