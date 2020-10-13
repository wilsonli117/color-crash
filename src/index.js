import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    const ballRadius = 10;
    let x = canvas.width * 0.05 //starting x coordinate of ball
    let y = canvas.height - ballRadius; //starting y coordiante of ball
    // let launchPowerX = canvas.width * 0.05
    // let launchPowerY = canvas.height * 0.90
    let dx = 1000; //hard-coded x velocity of ball
    let dy = -1000; // hard-coded y velocity of ball
    const rateOfMovement = 50;
    let targetHeight = canvas.height + (2 * dy);
  

    const drawBall = () => {
        // if (dy > -1) {
        //     clearInterval(launchBall);
        // }
        
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
        ctx.lineTo(x, y)
        ctx.stroke();
        ctx.fillStyle = "green"
        ctx.fill();
        ctx.closePath();
    }

    const draw = () => {
        debugger;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        y += dy/rateOfMovement;
        // x += dx/rateOfMovement*10;
        drawBall();
        if (y + dy / rateOfMovement > canvas.height - ballRadius) {
            dy = -(0.6 * dy); //reduce velocity when ball hits "floor"
            targetHeight = canvas.height + (2 * dy);
        }

        if (dy < 0 && dy > -10) {
            dy = 0;
            y = canvas.height - ballRadius;
        }

        if (y <= targetHeight) {
            dy = -dy;
        }

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
    }

    // const launchBall = setInterval(draw, 10);

    let power = 0;
    let dpower = -10;

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

    
    
    const scrollSpeed = 1;
    let scrollPos = 0; // pixel of where the draw second image
    
    let img = new Image();
    img.src = "./src/background.png"

    const backgroundLoop = () => {
      
        ctx.clearRect(0,0, canvas.width, canvas.height);

        if (scrollPos >= canvas.width) {
            scrollPos = 0; //resets 
        }

        scrollPos += scrollSpeed

        ctx.drawImage(img, -scrollPos, 0, 880, 320);
        ctx.drawImage(img, canvas.width - scrollPos, 0, 880, 320);
        // ctx.drawImage(img, imgWidth, 0, 880, 320, 321, 0)
        
        // if (imgWidth + scrollSpeed == canvas.width) {
        //     imgWidth = 0;
        // }
        
        
       
        window.requestAnimationFrame(backgroundLoop);
    }

    img.addEventListener('load', () => {
        backgroundLoop();
        // setInterval(backgroundLoop, 10);
    })

})