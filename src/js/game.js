/* THIS IS THE SPACE INVADERS GAME FOR CISC 3140 FALL 2018 /*
/* THIS GAME USES THE PHASER JAVASCRIPT FRAMEWORK FOUND AT PHASER.IO */

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

 Explosion sound effect obtained from https://www.zapsplat.com
 comeandfindme.ogg - Background Music - Eric Skiff - Come and Find Me - Resistor Anthems - Available at http://EricSkiff.com/music
 dramatic_piano_phrase.ogg - Lose Music - Alexander - Dramatic Piano Phrase - Available at http://www.orangefreesounds.com/dramatic-piano-phrase/
 Player and Enemy sprite adapted from "Classic Hero" Sprite: https://opengameart.org/content/classic-hero


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
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);
console.log("DEBUG: states added");

/* variable to store global volume level */
var volume = 1.0;

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
}

/* variable to store current level */
var level = 0;

/* Start physics engine and then continue to the menuState */
function preload() {

    // Start 'arcade' game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    console.log("DEBUG: physics started");

    // Start the game at the menu state
    game.state.start('menu');
};