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

			var letter = letters.create(positions[firstPosition][0], positions[firstPosition][1], this.letterImageKeys[currentLetter]);
			var soundButton = game.add.button(positions[firstPosition][0] + 30, positions[firstPosition][1] + 100, 'win')
			
			if (i == 0) {
				
				var winLabel = game.add.text(game.world.centerX, game.world.height-80, 'Encuentra la '+this.letterImageKeys[currentLetter], {font: '50px Times New Roman', fill: '#00FF00'});
			
			}
			
			soundButton.name = this.letterImageKeys[currentLetter];
			
			soundButton.onInputUp.add((button)=> this.sounds[button.name].play() ,this);

			letter.inputEnabled = true;
			
			letter.input.start(0, true);
			
			letter.events.onInputUp.add(this.verify, this, 0, this.levelData);

			currentLetter = (currentLetter + 1)%totalLetters;
			
			firstPosition = (firstPosition + 1)%totalLetters;
		
		}

		this.start();

	}

	verify(sprite, pointer) {
		
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
        
        this.sounds['encuentra'].onStop.addOnce( () => {
            
            this.sounds[this.letterImageKeys[this.chosenLetter]].play();
        
        }, this);
    }
		
};