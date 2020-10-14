const ballRadius = 10;
const gravity;
const friction;

export class Ball {
    constructor(position, velocity) {
        this.x = position[0]
        this.y = position[1]

        this.vx = velocity[0]
        this.vy = velocity[1]

        this.falling = false;

    }

    drawBall(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2, false);
        ctx.lineTo(this.x, this.y)
        ctx.stroke();
        ctx.fillStyle = "green"
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.vy / rateOfMovement > canvas.height - ballRadius) {
            dy = -(0.8 * dy);
            targetHeight = canvas.height + (2 * dy);
        }

        // if (dy > -100) {
        //     dy = 0;
        // }

        if (y <= targetHeight) {
            dy = -dy;
        }
        // if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        //     dx = -dx;
        // }
    }


}





const launchBall = setInterval(draw, 10);
