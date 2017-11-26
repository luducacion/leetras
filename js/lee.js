var LETTER_WIDTH = 70,
	LETTER_HEIGHT = 70;

class lee {

	init(levelData) {
		
				this.levelData = levelData;
				console.log("init");
	}
	
	create() {
		// Random start positions that ensure no overlap, based on splitting the screen into quadrants
		var positions = [
			[Random.randomLetter(10, game.world.width/2 - LETTER_WIDTH), Random.randomLetter(10, game.world.height/2 - LETTER_HEIGHT)],
			[Random.randomLetter(game.world.width/2 + 10, game.world.width - (LETTER_WIDTH + 10)), 
				Random.randomLetter(10, game.world.height/2 - LETTER_HEIGHT)],
			[Random.randomLetter(10, game.world.width/2 - LETTER_WIDTH), 
				Random.randomLetter(game.world.height/2 + 10, game.world.height - (LETTER_HEIGHT + 10))],
			[Random.randomLetter(game.world.width/2 + 10, game.world.width - (LETTER_WIDTH + 10)),
				Random.randomLetter(game.world.height/2 + 10, game.world.height - (LETTER_HEIGHT + 80))]
		];
		
		this.sounds = this.levelData.sounds;
		
		this.letterImageKeys = this.levelData.letterImageKeys;
		
		var letters = game.add.group();

		var letter;
		var lowestLetter = 0;
		var highestLetter = this.levelData.numberOfLetters - 1;
		
		var totalLetters = highestLetter;

		this.chosenLetter = Random.randomLetter(lowestLetter, highestLetter);
		
		var currentLetter = this.chosenLetter;

		var firstPosition = Random.randomLetter(lowestLetter, highestLetter-1);
		
		for (var i = 0; i < 4; i++) {

			console.log(firstPosition);
			
			letter = letters.create(positions[firstPosition][0], positions[firstPosition][1], this.letterImageKeys[currentLetter], undefined, undefined, i);
			
			if (i == 0) {
				
				var winLabel = game.add.text(game.world.centerX, game.world.height-80, 'Encuentra la '+this.letterImageKeys[currentLetter], {font: '50px Times New Roman', fill: '#00FF00'});
			}
		
			// Enable input
			letter.inputEnabled = true;
			letter.input.start(0, true);
			letter.levelData = this.levelData;
			letter.events.onInputUp.add(this.verify, this, 0, this.levelData);

			currentLetter = (currentLetter + 1)%totalLetters;
			firstPosition = (firstPosition + 1)%totalLetters;
		}

		this.start();
	}

	verify(sprite, pointer, levelData) {
		
		if (sprite.z == 0) {
			// Winning letter
			game.state.start('win', true, false, arguments[3]);
		
		} else {
			
			// Wrong letter
			game.state.start('lose', true, false, arguments[3]);
		}
	}
	
	start() {
		
			this.sounds['encuentra'].play();
			
			this.sounds['encuentra'].onStop.addOnce( function() {
				
				this.sounds[this.letterImageKeys[this.chosenLetter]].play();
			
			}, this);
		}

}