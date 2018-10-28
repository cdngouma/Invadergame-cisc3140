var playState = {

    preload : function () {
        // Load game assets
        game.load.audio('explosion1', '/assets/soundfx/zapsplat_explosion_1.mp3');
        game.load.audio('explosion2', '/assets/soundfx/zapsplat_explosion_2.mp3');
        score = new Score(0);
        lives = new Lives(3);
        level = 1;
    },

    create : function () {
        console.log("DEBUG: in play state");

        // create sounds for game
        explosion1 = new Phaser.Sound(game, 'explosion1', volume, false);
        explosion2 = new Phaser.Sound(game, 'explosion2', volume, false);

        // create controls
        //      these are currently just set up to test sounds
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

        // Display the score
        scoreDisplay = game.add.text(WIDTH-30, 20, score.getScore(), {
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

        // Display the current lives
        levelDisplay = game.add.text(30, 20, 'LIVES:  ' + lives.getLives(), {
            font: '20px Impact',
            fill: "White",
            align: "left",
            boundsAlignH: "left"
        }).setTextBounds(1, 1);

    },

    update : function ()  {

        // SOUND TEST
        if (cursors.left.isDown) {
            cursors.left.isDown = false;
            explosion1.play();
        }
        if (cursors.right.isDown) {
            cursors.right.isDown = false;
            explosion2.play();
        }

        // UPDATE SCORE TEST
        score.addToScore(1);  // add 1 to score each frame
        scoreDisplay.text = score.getScore(); // display new score
    },

    // Continue to the 'win' state
    win : function () {
        game.state.start('win');
    },

};