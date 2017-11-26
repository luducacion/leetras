
class avalancha {

    init(levelData) {
		
        this.levelData = levelData;

	}
    
    create() {

        this.LETTER_VELOCITY = 140; //The velocity at which the letters fall

        this.SPAWN_TIME = 600; // The time win between each letter spawns

        game.physics.setBoundsToWorld();

        this.letters = game.add.group();
        this.letters.enableBody = true;
        this.letters.physicsBodyType = Phaser.Physics.ARCADE;

        this.sounds = this.levelData.sounds;

        this.letterImageKeys = this.levelData.letterImageKeys;
        
        this.lowestLetter = 0;
		this.highestLetter = this.levelData.numberOfLetters - 1;
		
		var totalLetters = this.highestLetter;

        this.chosenLetter = Random.randomLetter(this.lowestLetter, this.highestLetter);
        
        var currentLetter = this.chosenLetter;

        var firstPosition = Random.randomLetter(this.lowestLetter, this.highestLetter);

        var winLabel = game.add.text(game.world.centerX, game.world.height-80, 'Encuentra la '+this.letterImageKeys[currentLetter], {font: '50px Times New Roman', fill: '#00FF00'});

        this.timer = game.time.create(false);

        // Initializing the score and scoretext
        this.scoreText = this.add.text(16, 16, 'Puntaje: ' + this.levelData.score, { fontSize: '32px', fill: '#F0F'});

        this.start();
        
    }

    start() {

        this.sounds['encuentra'].play();
        
        this.sounds['encuentra'].onStop.addOnce( () => {
            
            this.sounds[this.letterImageKeys[this.chosenLetter]].play();
        
            this.sounds[this.letterImageKeys[this.chosenLetter]].onStop.addOnce( () => {
                
                this.timer.loop(this.SPAWN_TIME, this.addLetter, this);

                this.timer.start();

            },this);

        }, this);

    }

    // Creates a new downward moving letter sprite at the top of the screen
    addLetter() {

        var letterIndex = Random.randomLetter(this.lowestLetter, this.highestLetter);
        
        var nletter = this.letters.create(20 + Math.random() * (game.world.width-100), -70, this.letterImageKeys[letterIndex]);
        
        nletter.checkWorldBounds = true;
        
        nletter.events.onOutOfBounds.add( (sprite) => { sprite.destroy(); });

        nletter.letterId = letterIndex;

        nletter.inputEnabled = true;

        nletter.events.onInputDown.add(this.letterOnClick, this, nletter);

        nletter.body.velocity.y = this.LETTER_VELOCITY;

    }

    // Triggered when a letter is clicked.
    letterOnClick(sprite) {

        if (sprite.letterId == this.chosenLetter) {

            this.levelData.score += 1;

        } else {

            this.levelData.score -= 1;
        }

        this.sounds[this.letterImageKeys[sprite.letterId]].play();

        sprite.destroy();

        this.updateScoreText();
    }

    updateScoreText() {

        let score = this.levelData.score;

        this.scoreText.text = 'Puntaje: ' + score;

        if (score < 0) {

            this.scoreText.fill = 'red';

        } else {

            this.scoreText.fill = 'green';

        }

        if (score >= 10) {

            this.Win();
        }
    }

    Win() {

        game.state.start('win', true, false, this.levelData);

    }

}