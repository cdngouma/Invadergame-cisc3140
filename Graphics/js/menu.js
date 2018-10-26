var menuState = {

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
    },

    update : function () {
        // when the any key is pressed, reset pressEvent to null and call play
        if (game.input.keyboard.pressEvent != null) {
            game.input.keyboard.pressEvent = null;
            game.state.start('play');
        }
    }

};