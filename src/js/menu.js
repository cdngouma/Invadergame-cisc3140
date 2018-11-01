var menuState = {

    preload : function () {
        // load assets for menu
        game.load.image('volumeOn', 'assets/sprites/volume_on.png');
        game.load.image('volumeOff', 'assets/sprites/volume_off.png');

    },

    create : function () {
        console.log("DEBUG: in menu state");

        // title of game
        // setTextBounds allows text to be centered on canvas
        // move location of text on canvas with math on WIDTH and HEIGHT constants
        game.add.text(WIDTH/2, (HEIGHT/5) * 1, 'START GAME', {
            font: '60px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // instructions to start game
        // setTextBounds allows text to be centered on canvas
        // move location of text on canvas with math on WIDTH and HEIGHT constants
        game.add.text(WIDTH/2, (HEIGHT/5) * 2, 'Instructions: \n' +
            'Move left and right using arrow keys \n' +
            'Shoot projectile with CTRL key \n' +
            'Press any key to start', {
            font: '20px Impact',
            fill: "White",
            align: "center",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // mute button for global volume - sets global 'volume' variable declared in game.js to either 1 or 0
        // move location of text on canvas with math on WIDTH and HEIGHT constants
        muteButton = game.add.image(WIDTH/2, (HEIGHT/5) * 4, 'volumeOn');
        muteButton.anchor.setTo(0.5, 0.5);
        muteButton.scale.x = .5;
        muteButton.scale.y = .5;

    },

    update : function () {
        // when the any key is pressed, reset pressEvent to null and call play
        // ** THIS SHOULD BE CHANGED TO A MOUSECLICK EVENT OVER THE TEXT 'START GAME'
        if (game.input.keyboard.pressEvent != null) {
            game.input.keyboard.pressEvent = null;
            game.state.start('play');
        }
    }

};