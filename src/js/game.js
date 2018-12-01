/* THIS IS THE SPACE INVADERS GAME FOR CISC 3140 FALL 2018 /*
/* THIS GAME USES THE PHASER 2 CE JAVASCRIPT FRAMEWORK FOUND AT PHASER.IO */

/*
 * * * * * * * * * * * * * * * * * * * * * * * *
 *              NOTES AND TUTORIALS              *
 * * * * * * * * * * * * * * * * * * * * * * * * *

Project adapted from documentation and projects/code at:
    https://photonstorm.github.io/phaser-ce/index.html  // OFFICIAL DOCUMENTATION - CHECK HERE FIRST!
    https://phaser.io/tutorials/making-your-first-phaser-2-game/index
    https://www.phaser.io/news/2015/06/using-states-tutorial
    https://www.phaser.io/examples
    https://www.joshmorony.com/phaser-fundamentals-using-states-in-phaser/

 * * * * * * * * * * * * * * * * * * * * * * * * *
 *               ASSET ATTRIBUTION               *
 * * * * * * * * * * * * * * * * * * * * * * * * *

 Player and Enemy sprite adapted from "Classic Hero" Sprite: https://opengameart.org/content/classic-hero
 Explosion sprite from https://opengameart.org/content/explosion-3


 * * * * * * * * * * * * * * * * * * * * * * * * *
 *              GAME CONFIGURATION               *
 * * * * * * * * * * * * * * * * * * * * * * * * *
 * /

/* Create a new instance of the game with our specified height and width:
 * Phaser.AUTO tries WebGL, and then falls back to Canvas
 * This maps the game to the gameDiv element (for use in HTML file) */

const WIDTH = 800;
const HEIGHT = 600;
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'gameDiv', { preload : preload });
console.log("DEBUG: game created");

/* Add each state of the game - these will control the flow of the game.
 *
 * Each phaser state automatically calls functions: preload() and create() then continues looping
 *      the update() function.
 *
 * preload() and create() should load game assets and create game objects, respectively
 * the update() cycle should control the game loop (i.e. collisions, update score, player movement */
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('instructions', instructionState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);
console.log("DEBUG: states added");

/* global variable to store global volume level */
var volume = 1.0;

/* global variable to store current level */
var level = 0;

/* class to store and manipulate a player's score */
class Score {
    constructor(score) {
        this.score = score;
    }

    addToScore(x) {
        this.score += x;
    }

    getScore() {
        return this.score.toString();
    }
}

/* class to store and manipulate information about a players number of lives */
class Lives {
    constructor(lives) {
        this.lives = lives;
        this.maxLives = lives;
    }

    addLife() {
        this.lives++;
    }

    removeLife() {
        this.lives--;
    }

    getLives() {
        return this.lives;
    }

    getMaxLives() {
        return this.maxLives;
    }
}

/* move to loadState */
function preload() {

    game.state.start('load');

};