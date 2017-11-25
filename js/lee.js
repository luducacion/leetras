class lee {
	
	create() {

		var positions = [
			[20,30],
			[460,40],
			[100,300],
			[500,350]
		];

		var sounds = {
			
			'A' : game.add.audio('A'),
			'E' : game.add.audio('E'),
			'I' : game.add.audio('I'),
			'O' : game.add.audio('O'),
			'U' : game.add.audio('U'),
			'encuentra': game.add.audio('encuentra')
			
		};
		
		var letters = game.add.group();

		var letter;
		var lowestLetter = 0,
			highestLetter = 3;
		
			var totalLetters = (highestLetter - lowestLetter)+1;

		var chosenLetter = Random.randomLetter(lowestLetter, highestLetter);
		
		var currentLetter = chosenLetter;

		var firstPosition = Random.randomLetter(lowestLetter, highestLetter);
		
		for (var i = 0; i < 4; i++) {
			
			letter = letters.create(positions[firstPosition][0], positions[firstPosition][1], letterImageKeys[currentLetter], undefined, undefined, i);
			
			if (i == 0) {
				
				var winLabel = game.add.text(game.world.centerX, game.world.height-80, 'Encuentra la '+letterImageKeys[currentLetter], {font: '50px Times New Roman', fill: '#00FF00'});
			}
		
			// Enable input
			letter.inputEnabled = true;
			letter.input.start(0, true);
			letter.events.onInputUp.add(this.verify);
			currentLetter = (currentLetter + 1)%totalLetters;
			firstPosition = (firstPosition + 1)%totalLetters;
		}

		this.start(sounds, chosenLetter);
	}

	verify(sprite, pointer) {
		
		if (sprite.z == 0) {
			// Winning letter
			game.state.start('win');
		
		} else {
			
			// Wrong letter
			game.state.start('lose');
		}
	}
	
	start(sounds, chosenLetter) {
		
			sounds['encuentra'].play();
			
			sounds['encuentra'].onStop.addOnce( function() {
				
				sounds[letterImageKeys[chosenLetter]].play();
			
			}, this);
		}

}