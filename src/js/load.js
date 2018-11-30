// The starts the physics engine and loads the assets for the game

var loadState = {

    // The preload function is a standard Phaser function and is automatically called
    preload : function () {

        // Start 'arcade' game physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log("DEBUG: physics started");

        // The label that displays during loading
        game.add.text(WIDTH/3.4, HEIGHT/3.4, 'LOADING', { font: '100px Impact', fill: "White" });

        // load all assets before any other play states to reduce lag
        // load assets for menu
        game.load.image('volumeOn', 'assets/sprites/volume_on.png');
        game.load.image('volumeOff', 'assets/sprites/volume_off.png');
        // Load game sounds
        game.load.audio('explosion1', 'assets/soundfx/zapsplat_explosion_1.mp3');
        game.load.audio('explosion2', 'assets/soundfx/zapsplat_explosion_2.mp3');
        game.load.audio('bgmusic', 'assets/soundfx/comeandfindme.ogg');
        // load player and player life sprites
        game.load.image('player', 'assets/sprites/player.png');
        game.load.image('live', 'assets/sprites/live.png');
        game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 32, 32, 6);
        // load player bullets sprites
        game.load.image('bullet0', 'assets/sprites/bullet0.png');
        game.load.image('bullet1', 'assets/sprites/bullet1.png');
        game.load.image('bullet2', 'assets/sprites/bullet3.png');
        // load faculty member sprites
        game.load.image('faculty-r0', 'assets/sprites/faculty-r0.png');
        game.load.image('faculty-r1', 'assets/sprites/faculty-r1.png');
        game.load.image('faculty-r2', 'assets/sprites/faculty-r2.png');
        game.load.image('faculty-r3', 'assets/sprites/faculty-r3.png');
        game.load.image('trustee', 'assets/sprites/trustee.png');
        // load faculty bullet
        game.load.image('faculty-bullet0', 'assets/sprites/faculty_bullet0.png');
        //background
        game.load.image('background', 'css/css_image/bk_college.png');
    },

    // The create function is a standard Phaser function and is automatically called
    create : function () {
        // Continue to the 'menu' state
        game.state.start('menu');
    }
};
