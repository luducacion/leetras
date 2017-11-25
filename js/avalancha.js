// Measures time until next letter appears.
var timer;
var total = 0;
var chosenLetter3; // The letter to look for in this particular game.
var letters;
const RIGHT = 0, LEFT = 1;
const LETTER_VELOCITY = 140,
      SPAWN_TIME = 600; // The time win between each letter spawns
var score = 0;
var scoreText;
var lowestLetter = 0,
            highestLetter = 3;

class avalancha {
    
    create() {

        game.physics.setBoundsToWorld();

        letters = game.add.group();
        letters.enableBody = true;
        letters.physicsBodyType = Phaser.Physics.ARCADE;
        var letter;
        
        var totalLetters = (highestLetter - lowestLetter)+1;

        chosenLetter3 = Random.randomLetter(lowestLetter, highestLetter);
        var currentLetter = chosenLetter3;

        var firstPosition = Random.randomLetter(lowestLetter, highestLetter);
        var winLabel = game.add.text(game.world.centerX, game.world.height-80, 'Encuentra la '+letterImageKeys[currentLetter], {font: '50px Times New Roman', fill: '#00FF00'});

        this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');

        this.mouse = game.input.activePointer;

        timer = game.time.create(false);
        // Set a TimerEvent to occur after 2 seconds
        timer.loop(SPAWN_TIME, this.updateCounter, this);
        timer.start();

        // Initializing the score and scoretext
        scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#F0F'});
        
    }
    
    update() {
    }

    // Timer's method. Is called every 2 seconds
    updateCounter() { 
        total++;
        // Create new letter, make it move vertically down
        this.addLetter();
    }

    // Creates a new downward moving letter sprite at the top of the screen
    addLetter() {
        var letterIndex = Random.randomLetter(lowestLetter, highestLetter);
        var nletter = letters.create(20 + Math.random() * (game.world.width-100), -70, letterImageKeys[letterIndex]);
        nletter.name = 'letter' + total.toString();
        nletter.checkWorldBounds = true;
        nletter.events.onOutOfBounds.add(function (sprite) {
            sprite.destroy();
        });
        nletter.letterId = letterIndex;
        nletter.inputEnabled = true;
        nletter.events.onInputDown.add(this.letterOnClick, this, nletter);
        nletter.body.velocity.y = LETTER_VELOCITY;
        console.log("Added letter with letterIndex " + nletter.data.letterId);
    }

    // Triggered when a letter is clicked.
    letterOnClick(sprite) {
        console.log("You clicked to destroy a letter.");
        console.log("chosenLetter3 is " + chosenLetter3 + " and sprite.letterId is " + sprite.letterId);
        if (sprite.letterId == chosenLetter3) {
            score += 10;
        } else {
            score -= 10;
        }
        sprite.destroy();
        this.updateScoreText();
    }

    updateScoreText() {
        scoreText.text = 'Puntaje: ' + score;
        if (score < 0) {
            scoreText.fill = 'red';
        } else {
            scoreText.fill = 'green';
        }
        if (score >= 200) {
            this.Win();
        }
    }

};

function randomLetter() {
    var highestLetter = 3,
        lowestLetter = 0;
    return Math.floor(Math.random() * (highestLetter - lowestLetter + 1)) + lowestLetter;
}