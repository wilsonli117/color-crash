export class Map {

    constructor(scrollSpeed, canvas, backGround) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")
        this.scrollSpeed = scrollSpeed;
        this.scrollPos = 0;
        this.backGround = backGround; //image object passed in 
        this.drawBackground = this.drawBackground.bind(this);
    }

    drawBackground() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.scrollPos >= this.canvas.width) {
            this.scrollPos = 0; //resets 
        }

        this.scrollPos += this.scrollSpeed;
        this.ctx.drawImage(this.backGround, -this.scrollPos, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.backGround, this.canvas.width - this.scrollPos, 0, this.canvas.width, this.canvas.height);
      
        // return requestAnimationFrame(this.drawBackground);
    }
    
    animate() {
        return this.drawBackground();
    }
}


