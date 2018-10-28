var playState = {

    preload : function () {
        // Load game assets
        game.load.audio('explosion1', '/assets/soundfx/zapsplat_explosion_1.mp3');
        game.load.audio('explosion2', '/assets/soundfx/zapsplat_explosion_2.mp3');
        level = 1;
    },

    create : function () {
        console.log("DEBUG: in play state");

        // create sounds for game
        explosion1 = new Phaser.Sound(game, 'explosion1', volume, false);
        explosion2 = new Phaser.Sound(game, 'explosion2', volume, false);

        // create controls
        //      these are currently just set up to test sounds
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.S);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // Display the score
        scoreDisplay = game.add.text(WIDTH-30, 20, score, {
            font: '20px Impact',
            fill: "White",
            align: "right",
            boundsAlignH: "right"
        }).setTextBounds(1, 1);

        // Display the current level
        levelDisplay = game.add.text(WIDTH/2, 20, 'LEVEL ' + level, {
            font: '20px Impact',
            fill: "White",
            align: "center",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);


    },

    update : function ()  {

        // SOUND TEST
        if (key1.isDown) {
            key1.isDown = false;
            explosion1.play();
        }
        if (key2.isDown) {
            key2.isDown = false;
            explosion2.play();
        }

        // UPDATE SCORE TEST
        score++;
        scoreDisplay.text = score;
    },

    // Continue to the 'win' state
    win : function () {
        game.state.start('win');
    }
};