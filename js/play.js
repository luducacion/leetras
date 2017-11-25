var chosenLetter;

var sounds = {} ;

var playState1 = {
	
	create: function() {

		var positions = [
			[20,30],
			[460,40],
			[100,300],
			[500,350]
		];

		sounds = {
			
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

		chosenLetter = randomLetter();
		
		var currentLetter = chosenLetter;

		var firstPosition = randomLetter();
		
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

		this.start();
	},


	Win: function() {
		
		game.state.start('win');
	},

	verify: function(sprite, pointer) {
		
		if (sprite.z == 0) {
			// Winning letter
			game.state.start('win');
		
		} else {
			
			// Wrong letter
			game.state.start('lose');
		}
	},
	
	start: function () {
		
			sounds['encuentra'].play();
			
			sounds['encuentra'].onStop.addOnce( function() {
				
				sounds[letterImageKeys[chosenLetter]].play();
			
			}, this);
		}

};

var playState2 = {

	create: function() {

		var positions = [
			[50, 200],
			[200,200],
			[350,200],
			[500,200]
		];

		sounds = {
			
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

		chosenLetter = randomLetter();
		
		var currentLetter = chosenLetter;

		var firstPosition = randomLetter();
		
		for (var i = 0; i < 4; i++) {

			letter = letters.create(positions[firstPosition][0], positions[firstPosition][1], letterImageKeys[currentLetter]);
			soundButton = game.add.button(positions[firstPosition][0] + 20, positions[firstPosition][1] + 100, 'win')
			
			if (i == 0) {
				
				var winLabel = game.add.text(game.world.centerX, game.world.height-80, 'Encuentra la '+letterImageKeys[currentLetter], {font: '50px Times New Roman', fill: '#00FF00'});
			
			}
			
			soundButton.name = letterImageKeys[currentLetter];
			
			soundButton.onInputUp.add(playSound,this);

			letter.inputEnabled = true;
			
			letter.input.start(0, true);
			
			letter.events.onInputUp.add(this.verify);

			currentLetter = (currentLetter + 1)%totalLetters;
			
			firstPosition = (firstPosition + 1)%totalLetters;
		
		}

		this.start();

	},

	Win: function() {
		
		game.state.start('win');
	
	},

	verify: function(sprite, pointer) {
		
		if (sprite.z == 0) {
			
			// Winning letter
			
			game.state.start('win2');
		} else {
			
			// Wrong letter
			
			game.state.start('lose2');
		}
	},

	start: function () {
		
			sounds['encuentra'].play();
			
			sounds['encuentra'].onStop.addOnce( function() {
				
				sounds[letterImageKeys[chosenLetter]].play();
			
			}, this);
		}
		
};


function playSound(button) {
	
		sounds[button.name].play();
}