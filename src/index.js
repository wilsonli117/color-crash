import "./styles/index.scss";
import { Map } from './scripts/map';
import { Ball } from './scripts/ball';
import { Launcher } from './scripts/launcher';

document.addEventListener("DOMContentLoaded", () => {
    const bgcanvas = document.getElementById("bgCanvas");
    const bgctx = bgcanvas.getContext("2d");
    const gamecanvas = document.getElementById("gameCanvas");
    const gamectx = gamecanvas.getContext("2d");

    let img = new Image();
    img.src = "./src/background.png"
    // img.addEventListener('load', draw);
    // const ball = new Ball(gamecanvas, 20, 280);
    // const map = new Map(ball.scrollSpeed, bgcanvas, img) //initial scroll speed based on initial ball velocity

    const launcher = new Launcher(gamecanvas);
    let ball;
    let map;

    const start = () => {
        bgctx.clearRect(0, 0, gamecanvas.width, gamecanvas.height);
        gamecanvas.removeEventListener("click", start);
        launcher.animate();
        gamecanvas.addEventListener("click", launch);
    }

    const launch = () => {
        if (launcher.launchAngle && launcher.launchPower >= 0) {
            gamecanvas.removeEventListener("click", launch);
            ball = new Ball(gamecanvas, launcher.launchPower, launcher.launchAngle);
            map = new Map(ball.scrollSpeed, bgcanvas, img) //initial scroll speed based on initial ball velocity
            animating = true;
            animate();
        }
    }

    let animating = true;

    const animate = () => {
        ball.animate();
        map.animate();


        map.scrollSpeed = ball.scrollSpeed; //will update every frame
        if (ball.scrollSpeed == 0) {
            // gamectx.clearRect(680, 305, 40, 30);
            gamectx.beginPath();
            gamectx.rect((gamecanvas.width / 2) - 250, 170, 500, 300);
            gamectx.stroke();
            gamectx.font = "30px Arial bold";
            gamectx.strokeText('GAME OVER', (gamecanvas.width / 2) - 90, 220);
            // gamectx.strokeText('CLICK TO PLAY AGAIN', 520, 260);
            gamectx.strokeText(`Score/Distance: ${ball.distance} ft`, 450, 320);
            gamectx.strokeText(ball.playTime, 450, 370);
            gamectx.closePath();
            animating = false;
            // gamecanvas.addEventListener('click', start);
        }
        

        if (animating) {
            requestAnimationFrame(animate);
        }
    }

    start();

})