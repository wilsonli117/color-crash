import { Map } from './map';
import { Ball } from './ball';
import { Launcher } from './launcher';
import { Block } from './block';

export class Game {
    constructor(bgcanvas, gamecanvas, img) {
        this.bgcanvas = bgcanvas;
        this.bgctx = bgcanvas.getContext("2d");
        this.gamecanvas = gamecanvas;
        this.gamectx = gamecanvas.getContext("2d");
        this.bgImage = img;
        this.launcher = undefined;
        this.ball = undefined;
        this.map = undefined;
        this.blocks = [];
        this.animating = false;
        this.negateNextBlock = false;

        this.start = this.start.bind(this);
        this.launch = this.launch.bind(this);
        this.animate = this.animate.bind(this);
    }

    start() {
        this.gamectx.font = "normal 10px bold Arial";
        this.gamecanvas.removeEventListener("click", this.start);
        this.bgctx.clearRect(0, 0, this.bgcanvas.width, this.bgcanvas.height);
        this.gamectx.clearRect(0, 0, this.gamecanvas.width, this.gamecanvas.height);
        this.launcher = new Launcher(this.gamecanvas);
        this.launcher.animate();
        this.gamecanvas.addEventListener("click", this.launch);
    }

    launch() {
        if (this.launcher.launchAngle && this.launcher.launchPower >= 0) {
            this.gamecanvas.removeEventListener("click", this.launch);
            this.ball = new Ball(this.gamecanvas, this.launcher.launchPower, this.launcher.launchAngle);
            this.map = new Map(this.ball.scrollSpeed, this.bgcanvas, this.bgImage); //initial scroll speed based on initial ball velocity
            this.blocks.push(new Block(this.ball.scrollSpeed, this.gamecanvas, 500));
            this.blocks.push(new Block(this.ball.scrollSpeed, this.gamecanvas, 1000));
            this.blocks.push(new Block(this.ball.scrollSpeed, this.gamecanvas, 1500));
            this.animating = true;
            this.animate();
        }
    }

    animate() {
        this.ball.animate();
        this.blocks[0].drawBlock(this.blocks[2].x);
        this.blocks[1].drawBlock(this.blocks[0].x);
        this.blocks[2].drawBlock(this.blocks[1].x);
        this.map.animate();


        this.map.scrollSpeed = this.ball.scrollSpeed; //will update every frame
        this.blocks.forEach(block => block.scrollSpeed = this.ball.scrollSpeed);

        if (this.ball.y >= 550) {
            this.blocks.forEach(block => {
                if (this.ball.x >= block.x + 20 && this.ball.x <= block.x + 60 && this.ball.y >= 560) {
                    switch(block.color) {
                        case 'green': 
                            if (!this.negateNextBlock) {
                                this.ball.scrollSpeed = 0;
                            }
                            this.negateNextBlock = false;
                            this.ball.color = 'green'
                            break;
                        case 'red':
                            if (!this.negateNextBlock) {
                                this.ball.vx *= 1.1;
                                this.ball.vy *= 1.15;
                            }
                            this.negateNextBlock = false;
                            this.ball.color = 'red';
                            break;
                        case 'yellow':
                            if (!this.negateNextBlock) {
                                this.ball.vx *= 1.05;
                                this.ball.vy *= 1.25;
                            }
                            this.negateNextBlock = false;
                            this.ball.color = 'yellow';
                            break;
                        case 'blue': 
                            if (!this.negateNextBlock) {
                                this.ball.vx *= 1.075;
                                this.ball.vy *= 1.2;
                            }
                            this.negateNextBlock = false;
                            this.ball.color = 'blue';
                            break;
                        case 'orange':
                            if (!this.negateNextBlock) {
                                this.ball.vx *= .85;
                                this.ball.vy *= 1.3;
                            }
                            this.negateNextBlock = false;
                            this.ball.color = 'orange';
                            break;
                        case 'purple':
                            if (!this.negateNextBlock) {
                                this.ball.vx *= .8;
                                this.ball.vy *= .8;
                            }
                            this.negateNextBlock = false;
                            this.ball.color = 'purple';
                            break;
                        case 'violet':
                            this.negateNextBlock = true;
                            this.ball.color = 'violet'
                            break;
                    }
                }
            })
        }
        // if (this.ball.x >= this.block.x + 20 && this.ball.x + 20 <= this.block.x + 60) {
         
        //     if (this.block.color == "green") {
        //         this.ball.scrollSpeed = 0;
        //     }
        // }

        if (this.ball.scrollSpeed == 0) {
            // gamectx.clearRect(680, 305, 40, 30);
            this.gamectx.beginPath();
            this.gamectx.rect((this.gamecanvas.width / 2) - 250, 170, 500, 300);
            this.gamectx.stroke();
            this.gamectx.textAlign = "center"
            this.gamectx.strokeText('GAME OVER', (this.gamecanvas.width / 2), 220);
            this.gamectx.strokeText('CLICK TO PLAY AGAIN', (this.gamecanvas.width / 2), 260);
            this.gamectx.textAlign = "left"
            this.gamectx.strokeText(`Score/Distance: ${this.ball.distance} ft`, 460, 330);
            this.gamectx.strokeText(this.ball.playTime, 460, 380);
            this.gamectx.closePath();
            this.animating = false;
            this.gamecanvas.addEventListener("click", this.start);
        }


        if (this.animating) {
            requestAnimationFrame(this.animate);
        } 
    }
}