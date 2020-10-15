const ballRadius = 20;
const gravity = .1; //constant force that acts upon ball
const bounce = 0.80; //20% energy loss when ball bounces or collides with object
const friction = 0.80; //5% energy loss when ball travels along a surface / x axis

export class Ball {
    constructor(canvas, speed, angle) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.angle = angle * (Math.PI / 180); //need to convert to radians
        this.x = this.canvas.width * 0.05 //starting x coordinate of ball
        this.y = this.canvas.height - ballRadius; //starting y coordinate of ball
        this.speed = speed;
        this.vx = Math.cos(this.angle) * (speed/20);
        this.vy = Math.sin(this.angle) * (speed/2);
        this.scrollSpeed = Math.floor(this.vx * 10);
        this.drawBall = this.drawBall.bind(this);
        this.move = this.move.bind(this);
        this.boost = this.boost.bind(this);
        debugger;
    }

    boost() {
        debugger;
        // this.x += 20;
        if (this.y > 0) {
            this.vy *= -1.25;
            this.vx *= 1.05
            this.scrollSpeed = Math.floor(this.vx * 7)
        }
    }

    drawBall() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2, false);
        this.ctx.lineTo(this.x, this.y)
        this.ctx.stroke();
        this.ctx.fillStyle = "blue";
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.drawBall();
        this.vy += gravity;

        //bounce 
        if (this.y + ballRadius + this.vy >= this.canvas.height) {
            this.vy *= -bounce;
            this.vx *= friction;
            this.scrollSpeed = Math.floor(this.vx * 10);
            debugger;
        }

        //smooth stopping for insignificant vx values 
        if (this.vx < .1) {
            this.vy = 0;
            this.vx = 0;
            this.y = this.canvas.height - ballRadius - 2;
        }

        this.x += this.vx/10; //control vx to not have ball go off right viewport, use bg scroll as speed illusion
        this.y += this.vy;

        // requestAnimationFrame(this.move); //will return an animation ID 
    }

    animate() {
        this.move();
        this.canvas.addEventListener('click', this.boost)
    }
}


