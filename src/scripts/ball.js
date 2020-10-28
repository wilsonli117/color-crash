const ballRadius = 20;
const gravity = .1; //constant force that acts upon ball
const bounce = 0.88; //20% energy loss when ball bounces or collides with object
const friction = 0.95; //5% energy loss when ball travels along a surface / x axis

export class Ball {
    constructor(canvas, power, angle) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "normal 25px bold Arial";
        this.ctx.fontstyle = "normal";
        this.angle = angle * (Math.PI / 180); //need to convert to radians
        this.x = this.canvas.width * 0.05 //starting x coordinate of ball
        this.y = this.canvas.height - ballRadius; //starting y coordinate of ball
        this.color = "grey";
        this.power = power;
        this.vx = Math.cos(this.angle) * (this.power/20);
        this.vy = Math.sin(this.angle) * (this.power/2);
        this.scrollSpeed = Math.floor(this.vx * 7);
        this.distance = 0;
        this.playTime = 0;
        this.time = undefined;
        this.drawBall = this.drawBall.bind(this);
        this.move = this.move.bind(this);
        this.boost = this.boost.bind(this);
        this.numBoosts = 3;
        this.time = Date.now() // in ms
    }

    boost() {
        if (this.y > 0 && this.numBoosts > 0) {
            this.vy *= -1.25;
            this.vx *= 1.15;
            this.scrollSpeed = Math.floor(this.vx * 7)
            this.numBoosts -= 1;
        }
    }

    timeElapsed() {
        // if (this.vx === 0 ) return "";
        const secondsElapsed = Math.floor((Date.now() - this.time)) / 1000 ;
        const minutesElapsed = Math.floor(secondsElapsed / 60);
        let result;
    
        if (minutesElapsed >= 1) {
            result = `Time Elapsed: 0${minutesElapsed}:${secondsElapsed % 60 > 10 ? `${secondsElapsed % 60}` : `0${secondsElapsed % 60}`}`.slice(0, 22);
            this.playTime = result;
        } else if (secondsElapsed > 1) {
            result = `Time Elapsed: 00:${(secondsElapsed % 60) > 10 ? `${secondsElapsed}` : `0${secondsElapsed}`}`.slice(0, 22);
            this.playTime = result;
        } else {
            result = `Time Elapsed: 00:00:${secondsElapsed}`.slice(0, 22);;
            this.playTime = result;
        }
        
        return result
    }

    magnitude() {
        let result;
        if (this.vx < .2) {
            return "0";
        }
        const vx = this.vx * 20; 
        const vy = this.vy * 2
        result = `${Math.sqrt(vx**2 + vy**2)}`; 
        // result = `${vx}`
        if (result < 100) {
            return result.slice(0,5);
        } else {
            return result.slice(0,6);
        }
    }

    offScreenHeight() {
        if (this.y < 0) {
            return `Height: ${-Math.floor(this.y/2) + 640} ft`
        } else {
            return ""
        }
    } 

    distanceTraveled() {
        this.distance = Math.floor(Math.cos(this.angle) * this.power * ((Date.now() - this.time)) / 1000)
    }

    drawBall() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2, false);
        this.ctx.lineTo(this.x, this.y)
        this.ctx.stroke();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.strokeText(`${this.offScreenHeight()}`, 350, 50);
        this.ctx.strokeText(`Distance: ${this.distance} ft`, 1100, 50);
        this.ctx.strokeText(`${this.timeElapsed()}`, 1100, 100);
        this.ctx.strokeText(`Velocity: ${this.magnitude()} ft/s`, 1100, 150);
        this.ctx.closePath();
    }

    move() {
        // this.drawBall();
        this.vy += gravity;
        this.distanceTraveled();
        //bounce 
        if (this.y + ballRadius + this.vy >= this.canvas.height) {
            this.vy *= -bounce;
            this.vx *= friction;
            this.scrollSpeed = Math.floor(this.vx * 7);
        }

        //smooth stopping for insignificant vx values 
        if (this.vx < .05 && this.vy < .2 && this.vy > -.2) {
            debugger;
            this.vy = 0;
            this.vx -= .075;
            this.y = this.canvas.height - ballRadius - 2;
            this.scrollSpeed = 0;
        }

        if (this.vx < 4 && this.vx >= 1) {
            this.x += this.vx/20; //control vx to prevent ball going off right-side viewport, use bg scroll as speed illusion
        } else if (this.vx < 1 && this.vx >= .1){
            this.x += this.vx/10;
        } else if (this.vx < .1 && this.vx > .01) {
            this.x += this.vx;
        } else {
            this.x += this.vx/40;
        }
        this.y += this.vy;
        this.drawBall();
        // requestAnimationFrame(this.move); //will return an animation ID 
    }

    animate() {
        this.move();
        this.canvas.addEventListener('click', this.boost)
        if (this.scrollSpeed == 0) {
            this.canvas.removeEventListener('click', this.boost)
        }
    }
}


