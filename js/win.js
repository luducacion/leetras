class winState {
	init(levelData) {
		console.log(levelData);
		this.levelData = levelData;
	}

	create() {

		var bg = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'tiledBackground');
		bg.anchor.setTo(0.5,0.5);
		var restartButton = game.add.button(game.world.centerX - 100 , game.world.centerY, 'restart', this.restartGame, this);
		restartButton.anchor.setTo(0.5,0.5);

		var menuButton = game.add.button(game.world.centerX + 100 , game.world.centerY, 'startButton', this.goToMainMenu, this);
		
		menuButton.anchor.setTo(0.5,0.5);

		var winLabel = game.add.text(80, 80, '¡Ganaste!', {font: '50px Arial', fill: '#00FF00'});

	}

	restartGame() {

		this.levelData.score = null;
		game.state.start('gameMaster', true, false, this.levelData);

	}

	goToMainMenu() {
		game.state.start('menu');
	}
};