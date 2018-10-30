var bulletTime = 0;

var playState = {

    preload : function () {
        // Load game assets
        game.load.audio('explosion1', 'assets/soundfx/zapsplat_explosion_1.mp3');
        game.load.audio('explosion2', 'assets/soundfx/zapsplat_explosion_2.mp3');
        game.load.image('player', 'assets/sprites/player.png');
        game.load.image('bullet0', 'assets/sprites/bullet0.png');
        game.load.image('bullet1', 'assets/sprites/bullet1.png');
        game.load.image('bullet2', 'assets/sprites/bullet3.png');
        score = new Score(0);
        lives = new Lives(3);
        level = 1;
    },

    create : function () {
        console.log("DEBUG: in play state");

        // create sounds for game
        explosion1 = new Phaser.Sound(game, 'explosion1', volume, false);
        explosion2 = new Phaser.Sound(game, 'explosion2', volume, false);

        // create player
        player = game.add.sprite(32, 32, 'player');
        player.x = WIDTH / 2;
        player.y = HEIGHT - 20;
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);

        //  create a bullet group for player
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        var numBullets = 30;    // N number of bullets needed for N enemies
        // adding bullets to group
        for (var i = 0; i < numBullets; i++){
            // randomly pick a image for each bullet
            var b = bullets.create(0, 0, 'bullet' + Math.floor(Math.random() * 100) % 3);
            b.anchor.setTo(0.5, 1.5);
            b.checkWorldBounds = true;
            b.outOfBoundsKill = true;
        }

        // create controls
        // these are currently just set up to test sounds
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Display the score
        scoreDisplay = game.add.text(WIDTH-30, 20, score.getScore(), {
            font: '20px Impact',
            fill: "White",
            align: "right",
            boundsAlignH: "right"
        }).setTextBounds(1, 1);

        // Display the current level
        levelDisplay = game.add.text(WIDTH/2, 20, 'LEVEL ' + level, {
            font: '20px Impact',
            fill: "White",
            align: "center",
            boundsAlignH: "center"
        }).setTextBounds(1, 1);

        // Display the current lives
        levelDisplay = game.add.text(30, 20, 'LIVES:  ' + lives.getLives(), {
            font: '20px Impact',
            fill: "White",
            align: "left",
            boundsAlignH: "left"
        }).setTextBounds(1, 1);

    },

    update : function ()  {
        var playerSpeed = 200;
        // MOVE PLAYER AROUND
        if(player.alive){
            // stop player then check for movement keys
            player.body.velocity.setTo(0, 0);

            if(cursors.left.isDown){
                player.body.velocity.x = -playerSpeed;
            } else if(cursors.right.isDown){
                player.body.velocity.x = playerSpeed;
            }

            // if player is out of bound, it appers on the other sides
            if(player.x < 0) player.x = WIDTH;
            else if(player.x > WIDTH) player.x = 0;

            if(fireButton.isDown){
                fireBullet();
            }
        }

        // SOUND TEST
        soundBtn1 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
        soundBtn2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
        if (soundBtn1.isDown) {
            cursors.left.isDown = false;
            explosion1.play();
        }
        if (soundBtn2.isDown) {
            cursors.right.isDown = false;
            explosion2.play();
        }

        // UPDATE SCORE TEST
        score.addToScore(1);  // add 1 to score each frame
        scoreDisplay.text = score.getScore(); // display new score
    },

    // Continue to the 'win' state
    win : function () {
        game.state.start('win');
    },

};

function fireBullet(){
    var bulletSpeed = 400;

    if(game.time.now > bulletTime){
        // create a bullet then
        bullet = bullets.getFirstExists(false);

        if (bullet){
            // fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -bulletSpeed;
            bulletTime = game.time.now + 200;
        }
    }
}