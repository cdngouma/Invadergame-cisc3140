var menuState = {

    enterButton : {},
    instructionButton : {},
    volumeButton : {},

    destroyKeys : function () {
        this.enterButton.destroy;
        this.instructionButton.destroy;
        this.volumeButton.destroy;
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
            'Shoot projectile with SPACE key \n' +
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

        this.enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.instructionButtonButton = game.input.keyboard.addKey(Phaser.Keyboard.I);
        this.volumeButton = game.input.keyboard.addKey(Phaser.Keyboard.V);

    },

    update : function () {
        // when the enter key is pressed, destroy key objects and call menu
        if (this.enterButton.isDown) {
            this.destroyKeys();
            game.state.start('play');
        }
    }

};