var winState = {

    enterButton : {},
    win_sound : {},

    create : function () {
        console.log("DEBUG: in win state");

        // sound to play when win state has been reached
        this.win_sound = new Phaser.Sound(game, 'game_win', volume * 1.5, false);

        // win message
        game.add.text(WIDTH / 2, HEIGHT / 3, 'YOU WIN', {
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

        // play win sound once
        this.win_sound.play();

    },

    update : function () {
        // when the enter key is pressed, destroy enterButton object and call menu
        if (this.enterButton.isDown) {
            this.enterButton.destroy;
            game.state.start('menu');
        }
    }
};