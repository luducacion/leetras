class escucha {

	init(levelData) {

		this.levelData = levelData;
	}

	create() {

		var positions = [
			[50, 200],
			[200,200],
			[350,200],
			[500,200]
		];

		 
        var background = game.add.sprite(0,0,'background1');

		this.sounds = this.levelData.sounds;

		this.letterImageKeys = this.levelData.letterImageKeys;

		var letters = game.add.group();

		var letter;
		var lowestLetter = 0;
		var highestLetter = this.levelData.numberOfLetters - 1;
		
		var totalLetters = highestLetter;

		this.chosenLetter = game.rnd.integerInRange(lowestLetter, highestLetter);
		
		var currentLetter = this.chosenLetter;

		var firstPosition = game.rnd.integerInRange(lowestLetter, highestLetter-1);

		var currentQuestionBlock = game.rnd.integerInRange(lowestLetter,highestLetter-1);
		
		for (var i = 0; i < 4; i++) {

			var letter = letters.create(positions[firstPosition][0], positions[firstPosition][1], "questionMark"+(currentQuestionBlock+1));

			letter.inputEnabled = true;
			
			letter.input.start(0, true);
			
			letter.events.onInputUp.add(this.verify, this, 0, this.levelData);

			var soundButton = game.add.button(positions[firstPosition][0], positions[firstPosition][1] + 100, 'speaker');
			
			if (i == 0) {
				
				var instructionLabel = game.add.text(game.world.centerX - 160 , game.world.height-80, 'Encuentra la letra ' + this.letterImageKeys[currentLetter], {fontSize: '50px', fill: '#FFFFFF'});
			
			}
			
			soundButton.name = this.letterImageKeys[currentLetter];
			
			soundButton.onInputUp.add((button)=> this.sounds[button.name].play() ,this);

			currentLetter = (currentLetter + 1)%totalLetters;
			
			firstPosition = (firstPosition + 1)%totalLetters;

			currentQuestionBlock = (currentQuestionBlock + 1)%totalLetters;
		
		}

		this.scoreText = this.add.text(16, 16, 'Puntaje: ' + this.levelData.score, { fontSize: '32px', fill: '#F0F'});

		if (this.levelData.score < 0) {

			this.scoreText.fill = 'red';

		} else if(this.levelData.score > 0) {

			this.scoreText.fill = 'green';

		}

		this.start();

	}

	verify(sprite, pointer) {
		
		if (sprite.z == 0) {
			
			// Winning letter
			this.levelData.score += 1;

		} else {
			
			// Wrong letter
			this.levelData.score -= 1;
		}

		this.winCondition();
	}

	winCondition() {

		if (this.levelData.score >= 5) {
			
			this.Win();

		} else {

			game.state.start('gameMaster', true, false, this.levelData);
			
		}
	}

	start() {
		
        this.sounds['encuentra'].play();
        
        this.sounds['encuentra'].onStop.addOnce( () => {
            
            this.sounds[this.letterImageKeys[this.chosenLetter]].play();
        
        }, this);
	}
	
	Win() {

        game.state.start('win', true, false, this.levelData);

    }
		
};