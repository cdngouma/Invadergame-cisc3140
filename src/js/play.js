var bulletTime = 0;
var cursors;
var player;
var facultyMembers;
var firingTimer = 0;    // set to regulate faculty members firing rate
var livingFaculties = [];

var playState = {

    preload : function () {
        // Load game assets
        game.load.audio('explosion1', 'assets/soundfx/zapsplat_explosion_1.mp3');
        game.load.audio('explosion2', 'assets/soundfx/zapsplat_explosion_2.mp3');
        game.load.audio('bgmusic', 'assets/soundfx/comeandfindme.ogg');
        game.load.image('player', 'assets/sprites/player.png');
        // load player bullets sprites
        game.load.image('bullet0', 'assets/sprites/bullet0.png');
        game.load.image('bullet1', 'assets/sprites/bullet1.png');
        game.load.image('bullet2', 'assets/sprites/bullet3.png');
        // load faculty member sprites
        game.load.image('faculty-r0', 'assets/sprites/faculty-r0.png');
        game.load.image('faculty-r1', 'assets/sprites/faculty-r1.png');
        game.load.image('faculty-r2', 'assets/sprites/faculty-r2.png');
        game.load.image('faculty-r3', 'assets/sprites/faculty-r3.png');
        game.load.image('trustee', 'assets/sprites/trustee.png');
        // load faculty bullet
        game.load.image('faculty-bullet0', 'assets/sprites/faculty_bullet0.png');
        //background
        game.load.image('background', 'css/css_image/bk_college.png');

        score = new Score(0);
        lives = new Lives(3);
        level = 1;
    },

    create : function () {
        console.log("DEBUG: in play state");

        // add background image
        this.add.image(0,0,'background');

        // create sounds for game
        explosion1 = new Phaser.Sound(game, 'explosion1', volume, false);
        explosion2 = new Phaser.Sound(game, 'explosion2', volume, false);
        bgmusic = new Phaser.Sound(game, 'bgmusic', volume, true);
        bgmusic.play();

        //  create a bullet group for player
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        var numBullets = 40;    // N number of bullets needed for N enemies
        // adding bullets to group
        for (let i = 0; i < numBullets; i++){
            // randomly pick a image for each bullet
            var b = bullets.create(0, 0, 'bullet' + Math.floor(Math.random() * 100) % 3);
            b.anchor.setTo(0.5, 1.5);
            b.checkWorldBounds = true;
            b.outOfBoundsKill = true;

            b.scale.x=0.5;
            b.scale.y=0.5;

        }

        // create player
        player = game.add.sprite(32, 32, 'player');
        player.x = WIDTH / 2;
        player.y = HEIGHT - 20;
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        //  create a bullet group for faculty members
        facultyBullets = game.add.group();
        facultyBullets.enableBody = true;
        facultyBullets.physicsBodyType = Phaser.Physics.ARCADE;

        // adding enemy bullets to group
        facultyBullets.createMultiple(numBullets, 'faculty-bullet0');
        facultyBullets.setAll('anchor.setTo', 0.5);
        facultyBullets.setAll('anchor.y', 1);
        facultyBullets.setAll('outOfBoundsKill', true);
        facultyBullets.setAll('checkWorldBounds', true);

        //  Create faculty members
        facultyMembers = game.add.group();
        facultyMembers.enableBody = true;
        facultyMembers.physicsBodyType = Phaser.Physics.ARCADE;
        this.createFacultyMembers();

        // create controls for player character
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
        livesDisplay = game.add.text(30, 20, 'LIVES:  ' + lives.getLives(), {
            font: '20px Impact',
            fill: "White",
            align: "left",
            boundsAlignH: "left"
        }).setTextBounds(1, 1);


    },

    update : function ()  {
        var playerSpeed = 200;
        if(player.alive){
            // stop player then check for movement keys
            player.body.velocity.setTo(0, 0);
            // move player around
            if(cursors.left.isDown){
                player.body.velocity.x = -playerSpeed; // move sprite to left
                player.scale.x = -1;    // face sprite to left
            } else if(cursors.right.isDown){
                player.body.velocity.x = playerSpeed; // move sprite to right
                player.scale.x = 1;    // face sprite to right
            }

            // fire bullet
            if(fireButton.isDown){
                this.fireBullet();
            }

            // fire faculty bullet
            if (game.time.now > firingTimer) {
                this.facultyShoots();
            }

            // run collision detection for faculty members and player bullets
            game.physics.arcade.overlap(bullets, facultyMembers, this.collisionHandler, null, this);
            // run collision detection for player character and faculty bullets
            game.physics.arcade.overlap(player, facultyBullets, this.playerCollision, null, this )

        }

        // UPDATE SCORE
        scoreDisplay.text = score.getScore(); // display new score
        livesDisplay.text = 'LIVES:  ' + lives.getLives(); // display current lives
    },

    // Continue to the 'win' state
    win : function () {
        game.state.start('win');
    },

    lose : function () {
        game.state.start('lose');
    },

    fireBullet : function() {
        var bulletSpeed = 400;

        if(game.time.now  > bulletTime ){
            // create a bullet then
            bullet = bullets.getFirstExists(false);

            if (bullet){
                // fire it
                bullet.reset(player.x, player.y + 8);
                bullet.body.velocity.y = -bulletSpeed;
                bulletTime = game.time.now + 200;
            }
        }
    },

    createFacultyMembers : function() {
        const MEMBERS_PER_ROW = 10;
        const ROWS = 4;
        let interval = 1000;    // interval in which faculty members move horizontally (in ms)
        var bossPos = Math.floor(Math.random() * (MEMBERS_PER_ROW-1));  // position of the trustee in upmost row

        for(y = 0; y < ROWS; y++){
            for(x = 0; x <  MEMBERS_PER_ROW; x++){
                var member;
                // member.name set a name each element of each row. This is needed to determine score
                if(y === 0 && x === bossPos){
                    member = facultyMembers.create(x * 60, y * 60 + 50, 'trustee');
                    member.name = 'trustee';
                } else {
                    member = facultyMembers.create(x * 60, y * 60 + 50, 'faculty-r' + y);
                    member.name = y+1;
                }
                member.anchor.setTo(0.5, 0.5);
                member.body.moves = false;
            }
        }

        // group initial position
        facultyMembers.x = 50;
        facultyMembers.y = 50;

        // make the faculty members move horizontally
        var tween = game.add.tween(facultyMembers).to({
            x: 200  // how far faculty members move horizontally
        }, interval, Phaser.Easing.Linear.None, true, 0, 1000, true);
    },

    facultyShoots : function() {
        var bulletSpeed = 120;
        var rate = 1000; // rate at which faculty members fire (in ms^-1)
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

            game.physics.arcade.moveToObject(facultyBullet, player, bulletSpeed);
            firingTimer = game.time.now + rate;
        }
    },


    // Function to handle collisions between bullets and faculty members
    collisionHandler : function (bullet, facultyMember) {
        facultyMember.kill();
        bullet.kill();

        var scores = [100, 80, 60, 40, 10];  // array of scores for each row from to to bottom; index 0 --> trustee
        let name = parseInt(facultyMember.name);

        if (name ===  'trustee') {
            explosion2.play();
            score.addToScore(scores[0]);
        }
        else {
            explosion1.play();
            score.addToScore(scores[name]);
        }
    },

    //function to detect if player is hit
    playerCollision : function() {
        facultyBullets.killAll();
        player.kill();
        lives.removeLife();
        if (lives.getLives() === 0) {
            this.lose();
        }
    }
};

