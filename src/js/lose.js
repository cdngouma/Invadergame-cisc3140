var loseState = {

    create : function () {
        console.log("DEBUG: in lose state");

        // lose message
        game.add.text(WIDTH / 2, HEIGHT / 3, 'YOU LOSE', {
            font: '60px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // instructions to start game
        game.add.text(WIDTH / 2, HEIGHT / 1.5, 'PRESS ANY KEY TO START', {
            font: '30px Impact',
            fill: "White",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);
    },

    update : function () {
        // when the any key is pressed, reset pressEvent to null and call menu
        if (game.input.keyboard.pressEvent != null) {
            game.input.keyboard.pressEvent = null;
            game.state.start('menu');
        }
    }
};
