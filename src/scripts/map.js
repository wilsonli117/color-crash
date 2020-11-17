export class Map {

    constructor(scrollSpeed, canvas, backGround) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")
        this.scrollSpeed = scrollSpeed;
        this.scrollPos = 0;
        this.backGround = backGround; 
        this.drawBackground = this.drawBackground.bind(this);
    }

    drawBackground() {
        if (this.scrollPos >= this.canvas.width) {
            this.scrollPos = 0; 
        }

        this.scrollPos += this.scrollSpeed;
        this.ctx.drawImage(this.backGround, -this.scrollPos, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.backGround, this.canvas.width - this.scrollPos, 0, this.canvas.width, this.canvas.height);
    }
    
    animate() {
       this.drawBackground();
    }
}


