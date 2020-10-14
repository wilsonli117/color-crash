const ballRadius = 20;
const gravity = .1; //constant force that acts upon ball
const friction = 0.95; //5% energy loss when ball travels along a surface / x axis
const bounce = 0.85; //15% energy loss when ball bounces or collides with object

export class Ball {
    constructor(canvas, velocity) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.x = gamecanvas.width * 0.05 //starting x coordinate of ball
        this.y = gamecanvas.height - ballRadius; //starting y coordinate of ball

        this.vx = velocity[0]
        this.vy = velocity[1]
        this.targetHeight = this.canvas.height + (20 * this.vx);
    }

    drawBall(ctx) {
        gamectx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2, false);
        ctx.lineTo(this.x, this.y)
        ctx.stroke();
        ctx.fillStyle = "green"
        ctx.fill();
        ctx.closePath();
    }

    move() {
        //add gravity?
        this.x += this.vx;
        this.y += this.vy;

        //floor
        if (this.y + this.vy >= canvas.height - ballRadius) {
            this.vy *= -bounce
            this.vx *= friction
            this.y = this.canvas.height - ballRadius
        }

        if (this.vy  )

        //ball moving
        
        this.x += this.vx;
        this.y += this.vy;


    }


}





const launchBall = setInterval(draw, 10);
