import "./styles/index.scss";
import { Map } from './scripts/map';

document.addEventListener("DOMContentLoaded", () => {
    const bgcanvas = document.getElementById("bgCanvas");
    const bgctx = bgcanvas.getContext("2d");
    const gamecanvas = document.getElementById("gameCanvas");
    const gamectx = gamecanvas.getContext("2d");

    const ballRadius = 20;
    let x = gamecanvas.width * 0.05 //starting x coordinate of ball
    let y = gamecanvas.height - ballRadius; //starting y coordinate of ball
    // let launchPowerX = canvas.width * 0.05
    // let launchPowerY = canvas.height * 0.90
    const gravity = .1;
    const speed = 20;
    const angle = 280 * (Math.PI / 180);
    const bounce = 0.80;
    const friction = 0.95;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    let scrollSpeed = Math.floor(vx * 5);
  
    const drawBall = () => {
        // if (dy > -1) {
        //     clearInterval(launchBall);
        // }
        
        gamectx.beginPath();
        gamectx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
        gamectx.lineTo(x, y)
        gamectx.stroke();
        gamectx.fillStyle = "green"
        gamectx.fill();
        gamectx.closePath();
    }

    const draw = () => {
        gamectx.clearRect(0, 0, gamecanvas.width, gamecanvas.height);
        drawBall();

        vy += gravity;
        
        if(y + ballRadius + vy > gamecanvas.height) {
            vy *= -bounce;
            vx *= friction;
            scrollSpeed = Math.floor(vx * 5);
            map.scrollSpeed = scrollSpeed;
        }

        if (vx < .5) {
            vy = 0;
            vx = 0;
            y = gamecanvas.height - ballRadius - 2;
            map.scrollSpeed = 0; //stop scrolling
        }

        y += vy
        x += vx/10;
        // if (y + dy / rateOfMovement > gamecanvas.height - ballRadius) {
        //     dy = -(0.88 * dy); //reduce velocity when ball hits "floor"
        //     dx = (0.88 * dx);
        //     scrollSpeed = Math.floor(dx / 100);
        //     if (scrollSpeed > 1) {
        //         map.scrollSpeed = scrollSpeed;
        //     }
        //     targetHeight = gamecanvas.height + (2 * dy);
        // }

        // if (dy < 0 && dy > -50) {
        //     debugger;
        //     dy = 0;
        //     dy = 0;
        //     y = gamecanvas.height - ballRadius - 5;
        //     map.scrollSpeed = scrollSpeed;
        // }

        // if (y <= targetHeight) {
        //     dy = -dy;
        // }

        // if (x + dx > gamecanvas.width - ballRadius || x + dx < ballRadius) {
        //     dx = -dx;
        // }
        requestAnimationFrame(draw);
    }

    let img = new Image();
    img.src = "./src/background.png"
    img.addEventListener('load', draw);
    
    const map = new Map(scrollSpeed, bgcanvas, img)

    const mapAnimationId = map.animate();


    // map.animate();

    // let power = 0;
    // let dpower = -10;

    // const drawLaunchPower = () => {
    //     if (power + dpower < 0 || power + dpower > 100) {
    //         dpower = -dpower
    //     } 
    //     ctx.beginPath();
    //     ctx.arc(launchPowerX, launchPowerY, power, 0, Math.PI * 1.5, true);
    //     ctx.lineTo(launchPowerX, launchPowerY)
    //     ctx.stroke();
    //     ctx.fillStyle = "orange"
    //     ctx.fill();
    //     ctx.closePath();
    // }

    // const drawLaunchPowerAnimation = () => {
    //     ctx.clearRect(0,0, canvas.width, canvas.height);
    //     drawLaunchPower();
    //     drawLaunchAngle();
    //     power += dpower;
    // }

    // const launchPower = setInterval(drawLaunchPowerAnimation, 100);
    

    // let launchAngleX = canvas.width * 0.05
    // let launchAngleY = canvas.height * 0.90

    // const drawLaunchAngle = () => {
    //     ctx.beginPath();
    //     ctx.moveTo(launchAngleX, launchAngleY)
    //     ctx.lineTo(launchAngleX + 70, launchAngleY - 70)
    //     ctx.stroke();
    //     ctx.closePath();
    // }



    // const drawLaunchAngleAnimation = () => {
    //     ctx.clearRect(0,0, canvas.width, canvas.height);
    //     drawLaunchAngle();

    // }

    // canvas.addEventListener("click", () => {
    //     clearInterval(launchPower);
    //     console.log(power);
    // })
    
 
})