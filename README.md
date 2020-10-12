# Color Crash

## 1. Background and Overview

Color Crash is a side scrolling game where the player initially launches a ball at an angle (0 - 90 degrees), and a power (1-100%). The player's score is determined by how far (in feet) they get the ball. After the initial launch, the ball will lose velocity and height each time it hits the ground. The round is over when the ball no longer has velocity or makes contact with a particular block. The playing map is always populated with 3 distinct colors (out of 7 distinct colors overall) that will affect the ball's velocity and height differently. For example, one color will increase height by a lot, and velocity by a little. Another color will decrease both velocity and height. One color will negate the next color. As the player's ball travels the screen, there is a cycling "special" color that will trigger a special effect if the ball makes contact with it. The player has 3 "up" boosts available to them during the course of the game, which will hit the ball at an upward angle when used, and increase the height/velocity of the ball. The player also has a down boost that regenerates over time that will hit the ball at a downward angle when used, and increase the velocity of the ball (player should time the use of the down boost to hit block colors of their choosing).

## 2.Functionality and MVPS

In Color Crash, users will be able to:

* Start a game by launching a ball with an angle(arrow that will move from 0-90 degrees) and a power(bar that will fill from 1-100%)
* See the next 4 block colors that are are upcoming
* Use boosts(on mouse click, either above the ball, for down boost, or below the ball, for up boost) to travel further
* Use specials(on mouse click when ball makes contact with an active special color, shown in the special bar located at top-middle of screen) to travel further
* Score based on how far the ball travels(in feet)


In addition, this project will include:

* A high score board
* A section with instructions on how to play the game and a legend of the block colors


## 3. Wireframes

![Wireframe](https://tellurian.s3.amazonaws.com/Crash-Wireframe.png)

## 4. Technologies used

This game is implemented with:

* Javascript for the game logic
* HTML5 Canvas for graphics rendering
* Webpack as the Javascript module bundler

## 5. Implementation Timeline

* Day 1 - Set up project skeleton and review HTML5 Canvas
* Day 2 - Build ball object(with height and velocity) and implement launching feature. Build game map with background and continuous scrolling.
* Day 3 - Build colored-block object and implement interactions with ball. Build up and down boosts.
* Day 4 - Adding music, polishing graphics and add About Me and Instructions/Legend below game map.

