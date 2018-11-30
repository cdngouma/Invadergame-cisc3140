var loseState = {

    enterButton : {},

    create : function () {
        console.log("DEBUG: in lose state");

        // lose message
        game.add.text(WIDTH / 2, HEIGHT / 3, 'YOU LOSE', {
            font: '60px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // instructions to start game
        game.add.text(WIDTH / 2, HEIGHT / 1.5, 'PRESS ENTER KEY TO START', {
            font: '30px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // controls for state
        this.enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },

    update : function () {
        // when the enter key is pressed, destroy enterButton object and call menu
        if (this.enterButton.isDown) {
            this.enterButton.destroy;
            game.state.start('menu');
        }
    }
};
