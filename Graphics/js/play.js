var playState = {

    create : function () {
        console.log("DEBUG: in play state");

        // create sounds for game
        explosion1 = new Phaser.Sound(game, 'explosion1', volume, false);
        explosion2 = new Phaser.Sound(game, 'explosion2', volume, false);

        // create controls
        //      these are currently just set up to test sounds
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.S);

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
    },

    // Continue to the 'win' state
    win : function () {
        game.state.start('win');
    }
};