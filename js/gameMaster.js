class gameMaster {

	init(levelData){
		this.levelData = levelData;
	}

	create(){

		var currentGame = this.levelData.game;
		
		var currentLevel = this.levelData.level;

		var letterImageKeys = levels[currentGame][currentLevel].availableLetters;

		var numberOfLetters = levels[currentGame][currentLevel].numberOfLetters;

		var sounds = {};

		for (let letter of letterImageKeys) {

			sounds[letter] = game.add.audio(letter);

		}

		sounds['encuentra'] = game.add.audio('encuentra');

		this.levelData = {
			"currentGame" : currentGame,
			"currentLevel" : currentLevel,
			"letterImageKeys" : letterImageKeys,
			"sounds" : sounds,
			"numberOfLetters" : numberOfLetters
		}

		this.start();
	}

	start(){

		game.state.start(this.levelData.currentGame, true, false, this.levelData)
	}
}