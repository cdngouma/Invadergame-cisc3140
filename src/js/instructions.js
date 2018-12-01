var instructionState = {

    enterButton : {},

    destroyKeys : function () {
        this.enterButton.destroy;
    },

    create : function () {
        // INSTRUCTIONS FOR GAMEPLAY
        game.add.text(WIDTH/2, (HEIGHT/5) * 1,
            'Players start with 3 lives \n' +
            'The goal is to defeat all administrators and trustees while remaining alive \n' +
            '\n' +
            'Player can only have one projectile on screen at a time \n' +
            'Each hit by the administrators and trustees will cost one life  \n' +
            '\n' +
            'If the administrators and trustees reach the barrier of desks, all desks will disappear  \n' +
            'If the administrators and trustees reach the player, you have lost the game  \n' +
            '\n' +
            'Use the ARROW KEYS to move left and right \n' +
            'Use SPACE BAR to throw pencils at the administrators and trustees \n' +
            '\n' +
            'Press ENTER to return to main menu \n', {
            font: '20px Impact',
            fill: "White",
            align: "center",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // controls for state
        this.enterButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },

    update : function () {
        // when the enter key is pressed, destroy key objects and call menu
        if (this.enterButton.isDown) {
            this.destroyKeys();
            game.state.start('menu');
        }
    }

};