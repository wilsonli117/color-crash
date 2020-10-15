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
    const ball = new Ball(gamecanvas, 20, 280);
    const map = new Map(ball.scrollSpeed, bgcanvas, img) //initial scroll speed based on initial ball velocity

    // const mapAnimationId = map.animate();
    const animate = () => {
        ball.animate();
        map.animate();
        map.scrollSpeed = ball.scrollSpeed; //will update every frame
        if (ball.vx < 1) {
            map.scrollSpeed = 0;
        }

        requestAnimationFrame(animate);
    }

    const launcher = new Launcher(gamecanvas);

    launcher.animate();
   
    // animate();



    // let power = 0;
    // let dpower = 10;
    // let x = gamecanvas.width * 0.05
    // let y = gamecanvas.height * 0.90

    // const drawLaunchPower = () => {
    //     if (power + dpower < 0 || power + dpower > 100) {
    //         dpower = -dpower
    //     } 
    //     gamectx.beginPath();
    //     gamectx.arc(x, y, power, 0, Math.PI * 1.5, true);
    //     gamectx.lineTo(x, y)
    //     gamectx.stroke();
    //     gamectx.fillStyle = "orange"
    //     gamectx.fill();
    //     gamectx.closePath();
    // }

    // const launchAnimation = () => {
    //     gamectx.clearRect(0,0, gamecanvas.width, gamecanvas.height);
    //     power += dpower;
    //     drawLaunchPower();

    //     // requestAnimationFrame(launchAnimation);
    // }

    // let ang = 271
    // let radang = ang * (Math.PI / 180);
    // let dir = 1;

    // const drawLaunchAngle = () => {
    //     gamectx.beginPath();
    //     gamectx.moveTo(x, y)
    //     gamectx.lineTo(x + (Math.cos(radang) * 100), y + (Math.sin(radang) * 100))
    //     gamectx.stroke();
    //     gamectx.closePath();
    // }


    // drawLaunchAngle();

    // const drawLaunchAngleAnimation = () => {
    //     gamectx.clearRect(0,0, gamecanvas.width, gamecanvas.height);
    //     drawLaunchAngle();
    //     if (ang === 359) {
    //         dir = -1;

    //     } else if (ang === 271) {
    //         dir = 1;
    //     }
    //     ang += dir
    //     radang = ang * (Math.PI / 180);
        
    // }

    // const anganimation = setInterval(drawLaunchAngleAnimation, 10);

    // let launchAngle = undefined;
    // let launchPower = undefined;
    // let poweranimation;

    // const launchstart = () => {
    //     if (!launchAngle) {
    //         clearInterval(anganimation);
    //         launchAngle = ang;
    //         console.log(-(ang - 360));
    //         ball.angle = launchAngle * (Math.PI / 180)
    //         poweranimation = setInterval(launchAnimation, 50);
    //     } else {
    //         clearInterval(poweranimation);
    //         launchPower = power;
    //         console.log(power);
    //         ball.speed = launchPower;
    //         gamecanvas.removeEventListener("click", launchstart);
            
    //         animate();
    //     }
    // }

    
 
})