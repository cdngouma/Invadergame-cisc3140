var menuState = {

    enterButton : {},
    instructionButton : {},
    volumeButton : {},
    volButtonOn : {},
    volButtonOff : {},


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
        game.add.text(WIDTH/2, (HEIGHT/5) * 2,
            'Press V to toggle volume \n' +
            'Press N to view instructions \n' +
            'Press ENTER to start', {
            font: '20px Impact',
            fill: "White",
            align: "center",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // volume icon for global volume - sets global 'volume' variable declared in game.js to either 1 or 0
        this.volButtonOn = game.add.image(WIDTH/2, (HEIGHT/5) * 4, 'volumeOn');
        this.volButtonOn.anchor.setTo(0.5, 0.5);
        this.volButtonOn.scale.x = .5;
        this.volButtonOn.scale.y = .5;

        this.volButtonOff = game.add.image(WIDTH/2, (HEIGHT/5) * 4, 'volumeOff');
        this.volButtonOff.anchor.setTo(0.5, 0.5);
        this.volButtonOff.scale.x = .5;
        this.volButtonOff.scale.y = .5;
        this.volButtonOff.kill();

        // controls for menu state
        this.enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.instructionButton = game.input.keyboard.addKey(Phaser.Keyboard.N);
        this.volumeButton = game.input.keyboard.addKey(Phaser.Keyboard.V);

    },

    update : function () {
        // when the enter key is pressed, destroy key objects and call menu
        if (this.enterButton.isDown) {
            this.destroyKeys();
            game.state.start('play');
        }

        // when the instruction key is pressed, destroy key objects and call instructions
        if (this.instructionButton.isDown) {
            this.destroyKeys();
            game.state.start('instructions');
        }

        // toggle volume on 'V' keypress
        if (this.volumeButton.isDown) {
            if (volume === 1.0) {
                this.volumeButton.isDown = false;
                this.volButtonOn.kill();
                this.volButtonOff.revive();
                volume = 0.0;
            }
            else {
                this.volumeButton.isDown = false;
                this.volButtonOff.kill();
                this.volButtonOn.revive();
                volume = 1.0;
            }
        }
    }

};