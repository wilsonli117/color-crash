# Tetrjs

## 1. Background and Overview

Tetrjs is a javascript implementation of the popular tile-matching video game, Tetris, created by Alexey Pajitnov. The player plays 
the game on a 10(width) x 20(height) grid where a variety if blocks ("tetriminoes"; seven distinctly shaped blocks: [I,T,S,Z,L,J,O]) drop from the 
top of the grid. The player can control the block by moving it left or right, or by rotating it counter-clockwise or clockwise. The player 
can also hold a block and and swap it with the current dropping block at any time. Any row that has all 10 blocks filled is cleared from the 
grid (a player can clear a maximum of 4 lines per drop) and player is scored points based on the following scoring system: 

| Level | 1 Line Cleared | 2 Lines cleared | 3 Lines Cleared | 4 Lines Cleared  |
|-------|----------------|-----------------|-----------------|------------------|
| n     | 40 * ( n + 1)  | 100 * ( n + 1 ) | 300 * ( n + 1 ) | 1200 * ( n + 1 ) |

As the player clears [X] lines, they will advance to the levels where block drop speed increases. A player uses when a block that is placed and it extends 
past row 20.

## 2.Functionality and MVPS

In Tetrjs, users will be able to:

* Start a game on a 10x20 grid
* See the next 6 blocks that are dropping
* Control the current dropping block by moving left/right or rotating clockwise/counter-clockwise
* Clear rows that have a block in all 10 spaces
* Score points and advance levels by clearing rows
* Hold a block that can be swapped with the current dropping block as long as it has not been "locked" (on first held block, will hold intended block and swap to next)

In addition, this project will include:

* A high score board
* A section with instructions on how to play the game


## 3. Wireframes

![Wireframe](https://tellurian.s3.amazonaws.com/Tetrjs_Wireframe.png)
