var bulletTime = 0;
// var cursors;
var player;
var facultyMembers;
var firingTimer = 0;    // set to regulate faculty members firing rate
var livingFaculties = [];

var playState = {

    preload : function () {
        // Load game assets
        game.load.audio('explosion1', 'assets/soundfx/zapsplat_explosion_1.mp3');
        game.load.audio('explosion2', 'assets/soundfx/zapsplat_explosion_2.mp3');
        game.load.image('player', 'assets/sprites/player.png');
        // load player bullets sprites
        game.load.image('bullet0', 'assets/sprites/bullet0.png');
        game.load.image('bullet1', 'assets/sprites/bullet1.png');
        game.load.image('bullet2', 'assets/sprites/bullet3.png');
        // load faculty memeber sprites
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

        this.add.image(0,0,'background');

        // create sounds for game
        explosion1 = new Phaser.Sound(game, 'explosion1', volume, false);
        explosion2 = new Phaser.Sound(game, 'explosion2', volume, false);

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

        //  create a bullet group faculty members
        facultyBullets = game.add.group();
        facultyBullets.enableBody = true;
        facultyBullets.physicsBodyType = Phaser.Physics.ARCADE;

        // adding enemy bullets to group
        facultyBullets.createMultiple(numBullets, 'faculty-bullet0');
        facultyBullets.setAll('anchor.setTo', 0.5);
        facultyBullets.setAll('anchor.y', 1);
        facultyBullets.setAll('outOfBoundsKill', true);
        facultyBullets.setAll('checkWorldBounds', true);

        //  The faculty members
        facultyMembers = game.add.group();
        facultyMembers.enableBody = true;
        facultyMembers.physicsBodyType = Phaser.Physics.ARCADE;
        createFacultyMembers();

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

            if(fireButton.isDown){
                fireBullet();
            }

            if (game.time.now > firingTimer) {
                facultyShoots();
            }

            //run collision

            game.physics.arcade.overlap(bullets, facultyMembers, collisionHandler, null, this);
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
        //score.addToScore(1);  // add 1 to score each frame
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

function createFacultyMembers(){
    const MEMBERS_PER_ROW = 10;
    const ROWS = 4;
    let interval = 1000;    // interval in which faculty members move horizontally (in ms)
    var bossPos = Math.floor(Math.random() * (MEMBERS_PER_ROW-1));  // position of the trustee in upmost row

    for(y = 0; y < ROWS; y++){
        for(x = 0; x <  MEMBERS_PER_ROW; x++){
            var member;
            // memnber.name set a name each element of each row. This is needed to determine score
            if(y === 0 && x === bossPos){
                member = facultyMembers.create(x * 60, y * 60 + 50, 'trustee');
                member.name = 'trustee';
            }else{
                member = facultyMembers.create(x * 60, y * 60 + 50, 'faculty-r' + y);
                member.name = 'row-' + x;
            }
            member.anchor.setTo(0.5, 0.5);
            member.body.moves = false;
        }
    }

    // group intial postition
    facultyMembers.x = 50;
    facultyMembers.y = 50;

    // make the faculty members move horizontally
    var tween = game.add.tween(facultyMembers).to({
        x: 200  // how far faculty members move horizontally
    }, interval, Phaser.Easing.Linear.None, true, 0, 1000, true);
}


function facultyShoots () {
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
}

function collisionHandler(bullet,facultyMembers){
    bullet.kill();
    facultyMembers.kill();

    if(facultyMembers.kill()){
        score.addToScore(20);
    }

}