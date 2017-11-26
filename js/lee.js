var LETTER_WIDTH = 70,
	LETTER_HEIGHT = 70;

class lee {

	init(levelData) {
		
				this.levelData = levelData;

	}
	
	create() {
		// Random start positions that ensure no overlap, based on splitting the screen into quadrants
		var positions = [
			[game.rnd.integerInRange(10, game.world.width/2 - LETTER_WIDTH), game.rnd.integerInRange(10, game.world.height/2 - LETTER_HEIGHT)],
			[game.rnd.integerInRange(game.world.width/2 + 10, game.world.width - (LETTER_WIDTH + 10)), 
				game.rnd.integerInRange(10, game.world.height/2 - LETTER_HEIGHT)],
			[game.rnd.integerInRange(10, game.world.width/2 - LETTER_WIDTH), 
				game.rnd.integerInRange(game.world.height/2 + 10, game.world.height - (LETTER_HEIGHT + 10))],
			[game.rnd.integerInRange(game.world.width/2 + 10, game.world.width - (LETTER_WIDTH + 10)),
				game.rnd.integerInRange(game.world.height/2 + 10, game.world.height - (LETTER_HEIGHT + 80))]
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
		
		for (var i = 0; i < 4; i++) {
			
			letter = letters.create(positions[firstPosition][0], positions[firstPosition][1], this.letterImageKeys[currentLetter], undefined, undefined, i);
			
			if (i == 0) {
				
				var instructionLabel = game.add.text(game.world.width - 500 , game.world.height-80, 'Encuentra la letra ' + this.letterImageKeys[currentLetter], {fontSize: '50px', fill: '#FFFFFF'});
			}
		
			// Enable input
			letter.inputEnabled = true;
			letter.input.start(0, true);
			letter.levelData = this.levelData;
			letter.events.onInputUp.add(this.verify, this, 0, this.levelData);

			currentLetter = (currentLetter + 1)%totalLetters;
			firstPosition = (firstPosition + 1)%totalLetters;
		}

		this.scoreText = this.add.text(16, 16, 'Puntaje: ' + this.levelData.score, { fontSize: '32px', fill: '#FFFFFF'});

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
		
		this.sounds['encuentra'].onStop.addOnce(() => {
			
			this.sounds[this.letterImageKeys[this.chosenLetter]].play();
		
		}, this);

	}

	Win() {
		
		game.state.start('win', true, false, this.levelData);
		
	}

}