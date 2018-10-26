var playState = {

    create : function () {
        console.log("DEBUG: in play state");


    },

    update : function ()  {

    },

    // Continue to the 'win' state
    win : function () {
        game.state.start('win');
    }
};