
var letterImageKeys = ['A','E','I','O','E','F','G','H','I','K','L'];

class loadState {

	// The preload function is another standard Phaser function that we
	// use to define and load our assets
	preload() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		// Load all assets. The first parameter is the variable that 
		// will point to the image, and the second parameter is the 
		// image file itself.
		game.load.image('player', 'assets/player.png');
		game.load.image('win', 'assets/win.png');
		game.load.image('startButton', 'assets/startButton.png');
		game.load.image('tiledBackground', 'assets/tiledBackground.png');
		game.load.image('A', 'assets/A.png');
		game.load.image('E', 'assets/E.png');
		game.load.image('I', 'assets/I.png');
		game.load.image('O', 'assets/O.png');
		game.load.image('U', 'assets/U.png');
		game.load.image('questionMark1', 'assets/questionMark1.png');
		game.load.image('questionMark2', 'assets/questionMark2.png');
		game.load.image('questionMark3', 'assets/questionMark3.png');
		game.load.image('questionMark4', 'assets/questionMark4.png');
		game.load.audio('A', 'assets/audio/A.m4a');
		game.load.audio('E', 'assets/audio/E.m4a');
		game.load.audio('I', 'assets/audio/I.m4a');
		game.load.audio('O', 'assets/audio/O.m4a');
		game.load.audio('U', 'assets/audio/U.m4a');
		game.load.audio('encuentra', 'assets/audio/encuentra.m4a');

	}

	create() {
		// Call the menu state
		game.state.start('menu');
	}
}