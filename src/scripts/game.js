import { Map } from './map';
import { Ball } from './ball';
import { Launcher } from './launcher';
import { Block } from './block';

export class Game {
    constructor(bgcanvas, gamecanvas, img, boostIcon) {
        this.bgcanvas = bgcanvas;
        this.bgctx = bgcanvas.getContext("2d");
        this.gamecanvas = gamecanvas;
        this.gamectx = gamecanvas.getContext("2d");
        this.bgImage = img;
        this.boostIcon = boostIcon;
        this.launcher = undefined;
        this.ball = undefined;
        this.map = undefined;
        this.blocks = [];
        this.animating = false;
        this.negateNextBlock = false;
        this.newRecord = false;
        this.highScore = 0;
        this.bgMusic = document.getElementById('bgm');
        this.greenBlockSF = document.getElementById('greenSF');
        this.greenBlockSF.volume = .2;
        this.blockBoostSF = document.getElementById('blockBoostSF');
        this.blockBoostSF.volume = .5;
        this.slowSF = document.getElementById('slowSF');
        this.slowSF.volume = .5;
        this.negateSF = document.getElementById('negateSF');
        this.negateSF.volume = .3;

        this.start = this.start.bind(this);
        this.launch = this.launch.bind(this);

        this.animate = this.animate.bind(this);
    }

    start() {
        this.gamectx.font = "normal 10px bold Arial";
        this.gamecanvas.removeEventListener("click", this.start);
        // this.bgctx.clearRect(0, 0, this.bgcanvas.width, this.bgcanvas.height);
        this.gamectx.clearRect(0, 0, this.gamecanvas.width, this.gamecanvas.height);
        this.bgctx.drawImage(this.bgImage, 0, 0, this.bgcanvas.width, this.bgcanvas.height);
        this.newRecord = false;
        this.launcher = new Launcher(this.gamecanvas);
        this.launcher.animate();
        this.gamecanvas.addEventListener("click", this.launch);
    }

    launch() {
        if (this.launcher.launchAngle && this.launcher.launchPower >= 0) {
            this.gamecanvas.removeEventListener("click", this.launch);
            this.bgctx.clearRect(0, 0, this.bgcanvas.width, this.bgcanvas.height);
            this.ball = new Ball(this.gamecanvas, this.launcher.launchPower, this.launcher.launchAngle, this.boostIcon);
            this.map = new Map(this.ball.scrollSpeed, this.bgcanvas, this.bgImage); //initial scroll speed based on initial ball velocity
            this.blocks[0] = new Block(this.ball.scrollSpeed, this.gamecanvas, 500);
            this.blocks[1] = new Block(this.ball.scrollSpeed, this.gamecanvas, 1000);
            this.blocks[2] = new Block(this.ball.scrollSpeed, this.gamecanvas, 1500);
            this.bgMusic.volume = .1;
            this.bgMusic.play();
            this.animating = true;
            this.gamecanvas.addEventListener('click', this.ball.boost)
            this.animate();
        }
    }

    animate() {
        this.map.animate();
        this.ball.animate();
        this.blocks[0].drawBlock(this.blocks[2].x);
        this.blocks[1].drawBlock(this.blocks[0].x);
        this.blocks[2].drawBlock(this.blocks[1].x);


        this.map.scrollSpeed = this.ball.scrollSpeed; //will update every frame
        this.blocks.forEach(block => block.scrollSpeed = this.ball.scrollSpeed);

        if (this.ball.y >= 550) {
            this.blocks.forEach(block => {
                if (this.ball.x - block.x <= 50 && this.ball.x >= block.x + 20 && this.ball.x <= block.x + 80) {
                     if (block.color === 'green') {
                        if (!this.negateNextBlock && !block.collided) {
                             this.ball.vy = 0;
                             this.ball.vx = 0;
                             this.ball.scrollSpeed = 0;
                             this.ball.numBoosts = 0;
                             this.greenBlockSF.play();
                        } else if (this.negateNextBlock) {
                            this.ball.color = 'grey';
                            this.negateSF.currentTime = 0;
                            this.negateSF.play();
                        }
                        this.negateNextBlock = false;
                        block.collided = true;
                     } else if (block.color === 'red') {
                        if (!this.negateNextBlock && !block.collided) {
                            this.blockBoostSF.currentTime = 0;
                            this.blockBoostSF.play();
                            this.ball.vx *= 1.05;
                            this.ball.vy *= 1.25;
                            this.ball.color = 'red';  
                        } else if (this.negateNextBlock) {
                            this.ball.color = 'grey'
                            this.negateSF.currentTime = 0;
                            this.negateSF.play();
                        }
                        this.negateNextBlock = false;
                        block.collided = true;
                    } else if (block.color === 'yellow') {
                        if (!this.negateNextBlock && !block.collided) {
                            this.blockBoostSF.currentTime = 0;
                            this.blockBoostSF.play();
                            this.ball.vx *= 1.1;
                            this.ball.vy *= 1.2;
                            this.ball.color = 'yellow';
                        } else if (this.negateNextBlock) {
                            this.ball.color = 'grey';
                            this.negateSF.currentTime = 0;
                            this.negateSF.play();
                        }
                        this.negateNextBlock = false;
                        block.collided = true;
                    } else if(block.color === 'blue') {
                        if (!this.negateNextBlock && !block.collided) {
                            this.blockBoostSF.currentTime = 0;
                            this.blockBoostSF.play();
                            this.ball.vx *= 1.15;
                            this.ball.vy *= 1.15;
                            this.ball.color = 'blue';
                        } else if (this.negateNextBlock) {
                            this.ball.color = 'grey';
                            this.negateSF.currentTime = 0;
                            this.negateSF.play();
                        }
                        this.negateNextBlock = false;
                        block.collided = true;
                    } else if (block.color === 'orange') {
                        if (!this.negateNextBlock && !block.collided) {
                            this.blockBoostSF.currentTime = 0;
                            this.blockBoostSF.play();
                            this.ball.vx *= .95;
                            this.ball.vy *= 1.35;
                            this.ball.color = 'orange';
                        } else if (this.negateNextBlock) { 
                            this.ball.color = 'grey';
                            this.negateSF.currentTime = 0;
                            this.negateSF.play();
                        }
                        this.negateNextBlock = false;
                        block.collided = true;
                    } else if (block.color === 'purple') {
                        if (!this.negateNextBlock && !block.collided) {
                            this.slowSF.currentTime = 0;
                            this.slowSF.play();
                            this.ball.vx *= .8;
                            this.ball.vy *= .8;
                            this.ball.color = 'purple';
                        } else if (this.negateNextBlock) { 
                            this.ball.color = 'grey';
                            this.negateSF.currentTime = 0;
                            this.negateSF.play();
                        }
                        this.negateNextBlock = false;
                        block.collided = true;
                    } else if (block.color === 'pink') {
                        if (!block.collided) {
                            this.negateSF.currentTime = 0;
                            this.negateSF.play();
                            this.negateNextBlock = true;
                            this.ball.color = 'pink'
                        }
                        block.collided = true;
                    }
                }
            })
        }

        if (this.ball.distance > this.highScore)  {
            this.newRecord = true;
            this.ball.newRecord = true;
        }

        if (this.ball.scrollSpeed == 0) {
            // gamectx.clearRect(680, 305, 40, 30);
            this.animating = false;
            this.gamecanvas.removeEventListener('click', this.boost)
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0; //resets position of audio playback
            this.gamectx.beginPath();
            this.gamectx.rect((this.gamecanvas.width / 2) - 250, 170, 500, 300);
            this.gamectx.stroke();
            this.gamectx.textAlign = "center"
            this.gamectx.strokeText('GAME OVER', (this.gamecanvas.width / 2), 220);
            this.gamectx.strokeText('CLICK TO PLAY AGAIN', (this.gamecanvas.width / 2), 260);
            this.gamectx.textAlign = "left"
            if (this.newRecord) {
                this.gamectx.strokeStyle = "red"
                this.gamectx.strokeText(`Score/Distance: ${Math.floor(this.ball.distance)} ft  NEW RECORD`, 460, 330);
                this.gamectx.strokeStyle = "black"
            } else {
                this.gamectx.strokeText(`Score/Distance: ${Math.floor(this.ball.distance)} ft`, 460, 330);
            }
            this.gamectx.strokeText(this.ball.playTime, 460, 380);
            this.gamectx.closePath();
            this.gamecanvas.addEventListener("click", this.start);

            if (this.newRecord) this.highScore = Math.floor(this.ball.distance);
        }




        if (this.animating) {
            requestAnimationFrame(this.animate);
        } 
    }

}