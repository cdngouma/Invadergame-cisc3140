var loseState = {

    enterButton : {},
    lose_sound : {},

    create : function () {
        console.log("DEBUG: in lose state");

        // sound to play when lose state has been reached
        this.lose_sound = new Phaser.Sound(game, 'game_over', volume, false);

        // lose message
        game.add.text(WIDTH / 2, HEIGHT / 3, 'YOU LOSE', {
            font: '60px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // instructions to start game
        game.add.text(WIDTH / 2, HEIGHT / 1.5, 'Press ENTER KEY to return to main menu', {
            font: '30px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // controls for state
        this.enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // play lose sound once
        this.lose_sound.play();

    },

    update : function () {
        // when the enter key is pressed, destroy enterButton object and call menu
        if (this.enterButton.isDown) {
            this.enterButton.destroy;
            game.state.start('menu');
        }
    }
};
