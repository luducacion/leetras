class escucha {

	init(levelData) {

		this.levelData = levelData;
	}

	create() {

		var XTiles = game.world.width / 10;
		var YTiles = game.world.height / 10;

		var positions = [
			[3 * XTiles, 4 * YTiles],
			[4 * XTiles, 4 * YTiles],
			[5 * XTiles, 4 * YTiles],
			[6 * XTiles, 4 * YTiles]
		];

		 
		var background = game.add.sprite(0,0,'background1');
		background.scale.setTo(scaleRatio, scaleRatio);

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
			
			letter.scale.setTo(scaleRatio, scaleRatio);

			letter.anchor.setTo(0.5, 0.5);
			
			letter.inputEnabled = true;
			
			letter.input.start(0, true);
			
			letter.events.onInputUp.add(this.verify, this, 0, this.levelData);

			var soundButton = game.add.button(positions[firstPosition][0], positions[firstPosition][1] + 100, 'speaker');
			soundButton.scale.setTo(scaleRatio, scaleRatio);
			
			if (i == 0) {
				
				var instructionLabel = game.add.text(game.world.width - 500 , game.world.height-80, 'Encuentra la letra ' + this.letterImageKeys[currentLetter], {fontSize: '50px', fill: '#FFFFFF'});
				instructionLabel.scale.setTo(scaleRatio, scaleRatio);

			}
			
			soundButton.name = this.letterImageKeys[currentLetter];
			
			
			soundButton.onInputUp.add((button)=> this.sounds[button.name].play() ,this);

			currentLetter = (currentLetter + 1)%totalLetters;
			
			firstPosition = (firstPosition + 1)%totalLetters;

			currentQuestionBlock = (currentQuestionBlock + 1)%totalLetters;
		
		}

		this.scoreText = this.add.text(16, 16, 'Puntaje: ' + this.levelData.score, { fontSize: '32px', fill: '#FFFFFF'});
		this.scoreText.scale.setTo(scaleRatio, scaleRatio);

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