class menuState {
	
	create() {
		
		var bg = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'tiledBackground');
		bg.anchor.setTo(0.5,0.5);
		// Here we display the name of the game. When defining text, the 
		// first two parameters are x and y positional values, then the
		// actual text, and then the 'font' defines the font (of course)
		// and 'fill' refers to the font color.
		var nameLabel = game.add.text(80, 80, 'Bienvenido al Juego', 
									{ font: '50px Arial', fill: '#ffffff'});

		// Start Game 1
		var startGame1 = game.add.button(game.world.centerX - 100 , game.world.centerY, 'startButton');
		startGame1.selectedGame = "lee";
		startGame1.anchor.x = 0.5;
		startGame1.anchor.y = 0.5;
		startGame1.levelData = {"currentGame": "lee", "currentLevel": 0};
		startGame1.onInputDown.add((button) => game.state.start('gameMaster', true, false, startGame1.levelData),this);



		// Start Game 2
		var startGame2 = game.add.button(game.world.centerX + 100, game.world.centerY, 'startButton');
		startGame2.selectedGame = "escucha";
		startGame2.anchor.x = 0.5;
		startGame2.anchor.y = 0.5;
		startGame2.levelData = {"currentGame": "escucha", "currentLevel": 0};
		startGame2.onInputDown.add((button) => game.state.start('gameMaster', true, false, startGame2.levelData),this);

		// Start Game 3
		var startGame3 = game.add.button(game.world.centerX, game.world.centerY + 100, 'startButton');
		startGame3.selectedGame = "avalancha";
		startGame3.anchor.x = 0.5;
		startGame3.anchor.y = 0.5;
		startGame3.onInputDown.add((button) => game.state.start(button.selectedGame),this);
	}

	
}