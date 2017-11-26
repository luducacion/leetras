class winState {
	init(levelData) {
		console.log(levelData);
		this.levelData = levelData;
	}

	create() {

		var bg = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'tiledBackground');
		bg.anchor.setTo(0.5,0.5);
		var startButton = game.add.button(game.world.centerX, game.world.centerY, 'startButton', this.restart, this);
		startButton.anchor.setTo(0.5,0.5);
		var winLabel = game.add.text(80, 80, '¡Ganaste!', {font: '50px Arial', fill: '#00FF00'});

	}

	restart() {
		
		game.state.start('gameMaster', true, false, this.levelData);
	}
};