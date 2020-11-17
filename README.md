# [Color Crash](https://ligokdoon.github.io/color-crash/)

## Background and Overview

Color Crash is a side scrolling browser game where the player initially launches a ball with an angle and a power percentage. The player's score is determined by the distance the ball travels. After the initial launch, the ball will have it's velocity and height altered each time it hits the ground or a block. The playing map is always populated with 3 colored blocks (out of 7 distinct colors) that will affect the ball's velocity differently. The round is over when the ball no longer has velocity or makes contact with a green block. 

![Color Crash Demo GIF](https://color-crash.s3.amazonaws.com/color_crash_gif.gif)

## Features

* Launch a ball by selecting an angle (arrow that will swivel from 1-89 degrees) and a power (bar that will fill from 1-100%)
* Ball will bounce realistically (has gravity acting upon it and friction applied when bouncing) and have various interactions with blocks depending on the color of the block.
* Infinitely scrolling game background and blocks where scrolling speed is variable and mapped to current velocity of the ball
* Click for boosts(on mouse click and limited to 3) on an on-screen ball
* Mute and unmute game music
* Sound effects for audio cues when the ball collides with the ground or with a block
* Score or distance of how far the ball travels is calculated in real-time (based on the current horizontal component of the ball's velocity)


## Architecture and Technology

This game is constructed with the following technologies:

* Javascript for the game logic
* HTML5 Canvas for graphics rendering on the game view
* Webpack as the Javascript module bundler
* CSS to style the UI

I utilized the object-oriented programming paradigm so that different objects could interact and communicate with each other. Game animation is achieved by using the Window method, requestAnimationFrame, and drawing onto the DOM/canvas(es) every frame. 

In addition to the entry file, the following scripts are employed in the game's implementation:

* `launcher.js`: This script handles the logic for constructing drawing the Launcher object. The Launcher's angle and power properties are then passed to the Ball class constructor
* `ball.js`: This script handles the logic for constructing and drawing the Ball object. The Ball object houses some key properties like `vx`/`vy` (horizontal and vertical velocity components) and key methods like `move` (where gravity, friction, and energy-loss from bouncing are conditionally applied each frame)
* `block.js`: This script handles the logic for constructing, drawing and recycling the Block objects. Each Block object has a color property that is randomly selected from an array of colors upon instantiation and updated as the Block is recycled
* `map.js`: This script handles the logic for drawing and scrolling the game background
* `game.js`: This script houses the game's object instances, object interaction logic, and animation


## Technical Challenges and Highlights

This project was built with physics emulation as a focal point. I wanted the movement of the ball to be convincingly realistic to players. To accomplish this, I had to review many physics and trigonometry concepts. Below are some examples of these concepts translated into code:
<br>
```

this.angle = angle * (Math.PI / 180); 
this.vx = Math.cos(this.angle) * (this.power / 20);
this.vy = Math.sin(this.angle) * (this.power / 2);

```
<img src="https://color-crash.s3.amazonaws.com/velocity_components_visualization.gif" height="400" />

This is a snippet from the Ball object constructor. The Ball constructor takes the angle and power properties from the Launcher object as arguments. A vector has both magnitude and a direction so the user-selected power (magnitude) and angle(direction) is the vector upon which the ball initially moves. The horizontal and vertical components of the vector can be determined by using the formulas **V<sub>x</sub> = cos *θ* &middot; power** and  **V<sub>y</sub> = sin *θ* &middot; power**. The power is divided by 20 and 2 respectively to control the velocity of the ball so that the ball does not leave the game view. 
<br>
<br>
```
const gravity = .1; 
const bounce = 0.88; 
const friction = 0.90; 
```

```
move() {
  this.vy += gravity;
  this.distanceTraveled();

  if (this.y + ballRadius + this.vy >= this.canvas.height) {
      this.vy *= -bounce;
      this.vx *= friction;
      this.scrollSpeed = Math.floor(this.vx * 7);
      if (Math.abs(this.vy) > 2) {
          this.bounceSFX.play();
      }
  }

  
  if (this.vx < .05 && this.vy < .2 && this.vy > -.2) {
      this.vy = 0;
      this.vx -= .075;
      this.y = this.canvas.height - ballRadius - 2;
      this.scrollSpeed = 0;
      this.numBoosts = 0;
  }

  if (this.vx < 4 && this.vx >= 1 && this.y < 1200) {
      this.x += this.vx/20; 
  } else if (this.vx < 1 && this.vx >= .1 && this.y < 1200){
      this.x += this.vx/10;
  } else if (this.vx < .1 && this.vx > .01 && this.y < 1200) {
      this.x += this.vx;
  } else {
      this.x += this.vx/60;
  }

  this.y += this.vy;
  this.drawBall();
}

```

Above is the `move` method of the Ball object. Constants are instantiated for gravity, friction, and energy-loss on bounce or collision. The move function is invoked on every frame. Gravity is a force that acts upon the ball on every frame and allows for smooth parabolic movement. This function is also checking on every frame if a bounce is imminent. If the Ball is about to bounce the sign of the Ball's vertical velocity is reversed, effectively reversing the direction of travel, after applying an energy loss coefficient. The other 2 conditionals this function is listening for are for the horizontal movement of the Ball. Because the canvas that comprises the game view is only 1400 pixels wide, I needed to control the horizontal movement of the Ball so that it will not exit the game view but this presented the challenge of the Ball not moving realistically. I solved this problem by using an infinitely scrolling background image to mimic horizontal travel.

```
drawBackground() {
  if (this.scrollPos >= this.canvas.width) {
      this.scrollPos = 0; 
  }

  this.scrollPos += this.scrollSpeed;
  this.ctx.drawImage(this.backGround, -this.scrollPos, 0, this.canvas.width, this.canvas.height);
  this.ctx.drawImage(this.backGround, this.canvas.width - this.scrollPos, 0, this.canvas.width, this.canvas.height);
}
    
 ```
 The background is drawn on a separate parallax background canvas as the objects in the game will move at different speeds. Infinite scrolling is executed by stitching an duplicate of the background image to itself. As the image scrolls and exits the game view, the duplicate image begins to be drawn. The scroll position will reset once it exceeds the width of the game view.
 
## Future Implementation

* Global leaderboard system using a lightweight backend like Firebase
* Interactions between colors or color chains

## Legal

Attributions for resources used in this project

### Images
* [UI Background](https://www.wallpapertip.com/wpic/oJiomw_light-colorful-background-hd/)

### Icons
* https://fontawesome.com/
* https://favicon.io/emoji-favicons/rainbow/

### Sounds
* [Game Over](https://freesound.org/people/josepharaoh99/sounds/368175/)
* [Slow Down](https://freesound.org/people/DarkoZL/sounds/101118/)
* [Collision](https://freesound.org/people/suntemple/sounds/241809)
* [Bounce](https://freesound.org/people/magnuswaker/sounds/540790/)
* [Boost](https://freesound.org/people/DigestContent/sounds/442755/)
* [Negate](https://freesound.org/people/Timbre/sounds/221683)
* [Background Music](https://www.youtube.com/watch?v=VdBzWa0CXdw)
