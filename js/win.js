class winState {
	init(levelData) {
		console.log(levelData);
		this.levelData = levelData;
	}

	create() {

		var background = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'tiledBackground');
		
		background.anchor.setTo( 0.5, 0.5);
		background.scale.setTo(scaleRatio, scaleRatio);

		var restartButton = game.add.button(game.world.centerX - 120 , game.world.centerY, 'restart', this.restartGame, this);
		
		restartButton.anchor.setTo(0.5,0.5);
		restartButton.scale.setTo(scaleRatio, scaleRatio);

		var menuButton = game.add.button(game.world.centerX + 120 , game.world.centerY, 'home', this.goToMainMenu, this);
		
		menuButton.anchor.setTo(0.5,0.5);
		menuButton.scale.setTo(scaleRatio, scaleRatio);

		var winLabel = game.add.text(game.world.centerX - 125, 80, '¡Ganaste!', {fontSize: '50px', fill: '#FFFFFF'});
		winLabel.scale.setTo(scaleRatio, scaleRatio);
		
	}

	restartGame() {

		this.levelData.score = null;
		game.state.start('gameMaster', true, false, this.levelData);

	}

	goToMainMenu() {
		game.state.start('menu');
	}
};