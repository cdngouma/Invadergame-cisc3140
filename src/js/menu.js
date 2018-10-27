var menuState = {

    preload : function () {
        // load assets for menu
        game.load.image('volumeOn', '/assets/sprites/volume_on.png');
        game.load.image('volumeOff', '/assets/sprites/volume_off.png');

    },

    create : function () {
        console.log("DEBUG: in menu state");

        // title of game
        // setTextBounds allows text to be centered on canvas
        game.add.text(WIDTH/2, HEIGHT/3, 'COLLEGE INVADERS', {
            font: '60px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // instructions to start game
        // setTextBounds allows text to be centered on canvas
        game.add.text(WIDTH/2, HEIGHT/1.5, 'PRESS ANY KEY TO START', {
            font: '30px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // mute button for global volume - sets global 'volume' variable declared in game.js to either 1 or 0
        muteButton = game.add.image(WIDTH/2, HEIGHT/1.3, 'volumeOn');
        muteButton.anchor.setTo(0.5, 0.5);
        muteButton.scale.x = .5;
        muteButton.scale.y = .5;

    },

    update : function () {
        // when the any key is pressed, reset pressEvent to null and call play
        if (game.input.keyboard.pressEvent != null) {
            game.input.keyboard.pressEvent = null;
            game.state.start('play');
        }
    }

};