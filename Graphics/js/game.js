/*
 * * * * * * * * * * * * * * * * * * * * * * * *
 *              NOTES AND TUTORIALS              *
 * * * * * * * * * * * * * * * * * * * * * * * * *

Project adapted from documentation and projects/code at:
    https://phaser.io/docs/2.6.2/index
    https://phaser.io/tutorials/making-your-first-phaser-2-game/index
    https://www.phaser.io/news/2015/06/using-states-tutorial
    https://www.phaser.io/examples
    https://www.joshmorony.com/phaser-fundamentals-using-states-in-phaser/

 * * * * * * * * * * * * * * * * * * * * * * * * *
 *               ASSET ATTRIBUTION               *
 * * * * * * * * * * * * * * * * * * * * * * * * *

 Explosion sound effect obtained from https://www.zapsplat.com


 * * * * * * * * * * * * * * * * * * * * * * * * *
 *              GAME CONFIGURATION               *
 * * * * * * * * * * * * * * * * * * * * * * * * *
 * /

/* Create a new instance of the game with our specified height and width:
 * Phaser.AUTO tries WebGL, and then falls back to Canvas
 * This maps the game to the gameDiv element (for use in HTML file) */
const WIDTH = 1024;
const HEIGHT = 768;
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'gameDiv', { preload: preload });
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

/* Load all game assets here, and then continue to the menuState */
function preload() {

    // Start 'arcade' game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    console.log("DEBUG: physics started");

    // Load all game assets
    game.load.audio('explosion1', '/assets/soundfx/zapsplat_explosion_1.mp3');
    game.load.audio('explosion2', '/assets/soundfx/zapsplat_explosion_2.mp3');

    console.log("DEBUG: assets loaded");
    // Start the game at the menu state
    game.state.start('menu');
};