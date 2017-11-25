var winState2 = {
	create: function() {

		var bg = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'tiledBackground');
		bg.anchor.setTo(0.5,0.5);
		var startButton = game.add.button(game.world.centerX, game.world.centerY, 'startButton', this.restart, this);
		startButton.anchor.setTo(0.5,0.5);
		var winLabel = game.add.text(80, 80, '¡Ganaste!', {font: '50px Arial', fill: '#00FF00'});

	},

	restart: function() {
		game.state.start('escucha');
	},
};