var bulletTime = 0;
var cursors;
var player;
var facultyMembers;
var firingTimer = 0;    // set to regulate faculty members firing rate
var livingFaculties = [];
var bullets;
var tweenCounter = 0;

var playState = {
    facultyTween : {},
    pause_flag : false,
    barrier : {},
    barrier_flag : true,

    create : function() {
        console.log("DEBUG: in play state");

        // set initial variables for first level
        score = new Score(0);
        lives = new Lives(3);
        level = 1;

        // add background image
        this.add.image(0,0,'background');

        // create sounds for game
        explosion1_sound = new Phaser.Sound(game, 'explosion1', volume, false);
        explosion2_sound = new Phaser.Sound(game, 'explosion2', volume, false);
        enemyshoot_sound = new Phaser.Sound(game, 'enemyshoot', volume * 0.25, false);
        playershoot_sound = new Phaser.Sound(game, 'playershoot', volume * 0.25, false);
        playerhit_sound = new Phaser.Sound(game, 'playerhit', volume * 0.5, false);
        trusteehit_sound = new Phaser.Sound(game, 'scream', volume, false);
        barrier_sound = new Phaser.Sound(game, 'barrier_hit', volume * 0.15, false);
        bgmusic = game.add.audio('bgmusic', volume * 0.5, true);
        bgmusic.play();

        //  create a bullet group for player
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        var numBullets = 40;    // number of bullets that can be active at one time
        // adding bullets to group
        for (let i = 0; i < numBullets; i++){
            // randomly pick a image for each bullet
            var playerBullets = bullets.create(0, 0, 'bullet' + Math.floor(Math.random() * 100) % 3);
            playerBullets.anchor.setTo(0.5, 1.5);
            playerBullets.checkWorldBounds = true;
            playerBullets.outOfBoundsKill = true;

            playerBullets.scale.x=0.60;
            playerBullets.scale.y=0.60;
        }

        // create player
        this.createPlayer();

        // Create barrier
        this.barrier_flag = true;
        this.barrier = game.add.group();
        this.barrier.enableBody = true;
        this.barrier.physicsBodyType = Phaser.Physics.ARCADE;
        this.barrier.x = 10;
        for (let i = 0; i < 10; i++) {
            this.barrier.create(i*80, 450, 'barrier0');
        }

        //  create a bullet group for faculty members
        facultyBullets = game.add.group();
        facultyBullets.enableBody = true;
        facultyBullets.physicsBodyType = Phaser.Physics.ARCADE;

        // adding enemy bullets to group
        var facNumBullets = 40;
        facultyBullets.createMultiple(facNumBullets, 'faculty-bullet0');
        facultyBullets.setAll('anchor.setTo', 0 );
        facultyBullets.setAll('anchor.y', 0);
        facultyBullets.setAll('outOfBoundsKill', true);
        facultyBullets.setAll('checkWorldBounds', true);

        // Create faculty members
        facultyMembers = game.add.group();
        facultyMembers.enableBody = true;
        facultyMembers.physicsBodyType = Phaser.Physics.ARCADE;
        this.createFacultyMembers();

        // create controls for player character
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Display the score
        scoreDisplay = game.add.text(WIDTH-30, 20, 'SCORE: ' + score.getScore(), {
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
        livesDisplay = game.add.text(30, 20, 'LIVES:  ', {
            font: '20px Impact',
            fill: "White",
            align: "left",
            boundsAlignH: "left"
        }).setTextBounds(1, 1);
        this.livesIcons = game.add.group();
        let nlives = lives.getLives();
        for(let i = 0; i < nlives; i++) {
            this.livesIcons.create(90+44*i, 14, 'live');
        }
    },

    update : function()  {
        var playerSpeed = 200;
        player.body.velocity.setTo(0, 0);

        // if game is not 'paused' allow player movement/firing and enemy firing
        if (player.alive){
            if (this.pause_flag === false) {
                // move player around
                if (cursors.left.isDown) {
                    player.body.velocity.x = -playerSpeed; // move sprite to left
                    player.scale.x = -1;    // face sprite to left
                } else if (cursors.right.isDown) {
                    player.body.velocity.x = playerSpeed; // move sprite to right
                    player.scale.x = 1;    // face sprite to right
                }

                // fire bullet
                if (fireButton.isDown && bullets.countLiving() === 0) {
                    this.fireBullet();
                }

                // fire faculty bullet
                if (game.time.now > firingTimer) {
                    this.facultyShoots();
                }
            }

            // run collision detection for faculty members and player bullets
            game.physics.arcade.overlap(bullets, facultyMembers, this.collisionHandler, null, this);
            // run collision detection for player character and faculty bullets
            game.physics.arcade.overlap(player, facultyBullets, this.playerCollision, null, this )
            // run collision detection for player bullets and barrier
            game.physics.arcade.overlap(this.barrier, bullets, this.barrierPlayerCollision, null, this )
            // run collision detection for enemy bullets and barrier
            game.physics.arcade.overlap(this.barrier, facultyBullets, this.barrierEnemyCollision, null, this )

        }

        // UPDATE SCORE
        scoreDisplay.text = 'SCORE: ' + score.getScore(); // display new score
        // update current lives
        let deaths = lives.getMaxLives() - lives.getLives();
        if(deaths > 0) {
            this.livesIcons
                .getAll()
                .slice(-1 * deaths)
                .forEach(l => l.kill());
        }

        // Check to see if player has won
        if (this.checkEnemyCount() === 0) {
            this.win();
        }

        // Check to see if enemy has reached desks - if so, remove all desks
        console.log(facultyMembers.y);
        if (facultyMembers.y > 185 && this.barrier_flag === true) {
            this.barrier_flag = false;
            this.barrier.killAll();
        }

        // Check to see if enemy has reached cut-off point (player level) to cause loss of game
        if (facultyMembers.y === 305) {
            this.lose();
        }
    },

    // Continue to the 'win' state
    win : function() {
        bgmusic.stop();
        game.state.start('win');
    },

    lose : function() {
        bgmusic.stop();
        game.state.start('lose');
    },

    fireBullet : function() {
        var bulletSpeed = 400;

        if(game.time.now  > bulletTime ){
            // create a bullet then
            bullet = bullets.getRandom();

            if (bullet){
                // fire it
                bullet.reset(player.x, player.y + 8);
                bullet.body.velocity.y = -bulletSpeed;
                bulletTime = game.time.now + 200;
                playershoot_sound .play();
            }
        }
    },

    createFacultyMembers : function() {
        const MEMBERS_PER_ROW = 10;
        const ROWS = 4;
        let interval = 1000;    // interval in which faculty members move horizontally (in ms)
        var bossPos = Math.floor(Math.random() * (MEMBERS_PER_ROW-1));  // position of the trustee in upmost row

        for(y = 0; y < ROWS; y++){
            for (x = 0; x <  MEMBERS_PER_ROW; x++){
                var member;
                // member.name set a name each element of each row. This is needed to determine score
                if (y === 0 && x === bossPos){
                    member = facultyMembers.create(x * 60, y * 60 + 40, 'trustee');
                    member.name = 'trustee';
                } else {
                    member = facultyMembers.create(x * 60, y * 60 + 40, 'faculty-r' + y);
                    member.name = y+1;
                }
                member.anchor.setTo(0.5, 0.5);
                member.body.moves = false;
            }
        }

        // group initial position
        facultyMembers.x = 50;
        facultyMembers.y = 50;

        // make the faculty members move
        // x is how far faculty members move horizontally, y is vertically
        this.facultyTween = game.add.tween(facultyMembers)
            .to({ x: 200 }, interval, Phaser.Easing.Linear.None, true, 0, 1000, true);

        this.facultyTween.onRepeat.add(onLoop, this);

        function onLoop() {
            descendAmount = 15;
            tweenCounter++;
            if (tweenCounter === 4) {
                facultyMembers.y += descendAmount;
                tweenCounter = 0;
            }
        }
    },

    facultyShoots : function() {
        var bulletSpeed = 120;
        var rate = 1500; // rate at which faculty members fire (in ms^-1)
        //  Grab the first bullet we can from the pool
        facultyBullet = facultyBullets.getFirstExists(false);

        livingFaculties.length = 0;

        facultyMembers.forEachAlive(function(faculty){
            livingFaculties.push(faculty);
        });

        if (facultyBullet && livingFaculties.length > 0) {

            var random = game.rnd.integerInRange(0, livingFaculties.length-1);
            var shooter = livingFaculties[random];
            // fire the bullet from this faculty member
            facultyBullet.reset(shooter.body.x, shooter.body.y);
            enemyshoot_sound.play();

            game.physics.arcade.moveToObject(facultyBullet, player, bulletSpeed);
            firingTimer = game.time.now + rate;
        }
    },

    // Function to handle collisions between bullets and faculty members
    collisionHandler : function(bullet, facultyMember) {
        let scores = [50, 30, 25, 20, 15];  // array of scores for each row from to to bottom; index 0 --> trustee
        let name = facultyMember.name;

        if (name ===  'trustee') {
            let blood = game.add.sprite(bullet.x, bullet.y - 85, 'blood');
            blood.scale.x = 1.5;
            blood.scale.y = 1.5;
            blood.anchor.setTo(0.5, 0.5);
            let splatter = blood.animations.add('splatter');
            blood.animations.play('splatter', 60, false, true);

            explosion2_sound.play();
            trusteehit_sound.play();

            score.addToScore(scores[0]);
        }
        else {
            let explosion = game.add.sprite(bullet.x, bullet.y - 85, 'explosion');
            explosion.scale.x = 2;
            explosion.scale.y = 2;
            explosion.anchor.setTo(0.5, 0.5);
            let explode = explosion.animations.add('explode');
            explosion.animations.play('explode', 20, false, true);

            explosion1_sound.play();

            score.addToScore(scores[parseInt(name)]);
        }

        facultyMember.kill();
        bullet.kill();
    },

    //function to detect if player is hit
    playerCollision : function() {
        this.pause_flag = true;
        this.facultyTween.pause();
        facultyBullets.killAll();
        bullets.killAll();
        lives.removeLife();
        playerhit_sound.play();

        var playerTween = game.add.tween(player).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 3, true, );

        playerTween.onComplete.add(function() {
            player.kill();
            if (lives.getLives() === 0) {
                this.pause_flag = false;
                this.lose();
            }
            else {
                this.createPlayer();
                this.facultyTween.resume();
                this.pause_flag = false;
            }
        }, this);
    },

    //function to detect if barrier is hit by player bullet
    barrierPlayerCollision : function(barrier, bullet) {
        barrier.kill();
        bullet.kill();
        barrier_sound.play();
    },

    //function to detect if barrier is hit by enemy bullet - just call barrierPlayerCollision with faculty bullet
    barrierEnemyCollision : function(barrier, facultyBullet) {
        this.barrierPlayerCollision(barrier, facultyBullet);
    },

    createPlayer : function() {
        player = game.add.sprite(32, 32, 'player');
        player.x = WIDTH / 2;
        player.y = HEIGHT - 20;
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
    },

    checkEnemyCount : function() {
        var livingEnemies = [];
        facultyMembers.forEachAlive(function () {
            // put every living enemy in an array
            livingEnemies.push(facultyMembers);
        });
        return livingEnemies.length;
    }
};

