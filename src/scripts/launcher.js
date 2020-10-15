export class Launcher {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.power = 0;
        this.dpower = 10;
        this.x = 500;
        this.y = 550;
        this.angle = 271;
        this.angleDir = 1; //direction angle selector is swiveling
        this.angleAnimation = undefined;
        this.powerAnimation = undefined;
        this.launchAngle = undefined;
        this.launchPower = undefined;

        this.angleMove = this.angleMove.bind(this);
        this.powerMove = this.powerMove.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    drawPower() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.strokeStyle = 'black';
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x, this.y - this.power);
        this.ctx.stroke();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.power, this.y);
        this.ctx.stroke();
        this.ctx.arc(this.x, this.y, this.power, 0, Math.PI * 1.5, true);
        this.ctx.lineTo(this.x, this.y)
        this.ctx.stroke();
        this.ctx.fillStyle = "orange"
        this.ctx.fill();
        this.ctx.lineTo(this.x + (Math.cos(this.angle * (Math.PI / 180)) * 100), this.y + (Math.sin(this.angle * (Math.PI / 180)) * 100))
        this.ctx.stroke();
        this.ctx.strokeText(`${-(this.angle - 360)}° ${this.power} Power`, this.x + (Math.cos(this.angle * (Math.PI / 180)) * 100) + 10, this.y + (Math.sin(this.angle * (Math.PI / 180)) * 100) - 10);
        this.ctx.strokeText(`${this.power}`, this.x + 1000, this.y + 1000);
        this.ctx.closePath();
    }

    powerMove() {
        if (this.power + this.dpower < 0 || this.power + this.dpower > 100) {
            this.dpower = -this.dpower
        }
        this.power += this.dpower;
        this.drawPower();
    }

    drawAngle() {
        // this.ctx.lineWidth = 10;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x, this.y - 100);
        this.ctx.stroke();
        this.ctx.strokeStyle = 'black';
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + 100, this.y);
        this.ctx.stroke();
        // this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'red';
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + (Math.cos(this.angle * (Math.PI / 180)) * 100), this.y + (Math.sin(this.angle * (Math.PI / 180)) * 100))
        this.ctx.stroke();
        this.ctx.strokeText(`${-(this.angle - 360)}°`, this.x + (Math.cos(this.angle * (Math.PI / 180)) * 100) + 10, this.y + (Math.sin(this.angle * (Math.PI / 180)) * 100) - 10);
        this.ctx.closePath();
    }

    angleMove() {
        this.drawAngle();
        if (this.angle === 359) {
            this.angleDir = -1;

        } else if (this.angle === 271) {
            this.angleDir = 1;
        }
        this.angle += this.angleDir
    }

    handleClick() {
        if (!this.launchAngle) {
            clearInterval(this.angleAnimation);
            this.launchAngle = this.angle;
            console.log(-(this.angle - 360));
            // ball.angle = launchAngle * (Math.PI / 180)
            this.powerAnimation = setInterval(this.powerMove, 50);
        } else {
            clearInterval(this.powerAnimation);
            this.launchPower = this.power;
            console.log(this.power);
            // ball.speed = launchPower;
            this.canvas.removeEventListener("click", this.handleClick);

            // animate();
        }
    }

    animate() {
        this.angleAnimation = setInterval(this.angleMove, 20);
        this.canvas.addEventListener("click", this.handleClick)
    }
}