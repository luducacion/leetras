
var letterImageKeys = ['A','E','I','O','E','F','G','H','I','K','L'];

class loadState {

	// The preload function is another standard Phaser function that we
	// use to define and load our assets
	preload() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		// Load all assets. The first parameter is the variable that 
		// will point to the image, and the second parameter is the 
		// image file itself.
		game.load.image('tiledBackground', 'assets/img/tiledBackground.gif');
		game.load.image('A', 'assets/img/A.png');
		game.load.image('E', 'assets/img/E.png');
		game.load.image('I', 'assets/img/I.png');
		game.load.image('O', 'assets/img/O.png');
		game.load.image('U', 'assets/img/U.png');
		game.load.image('questionMark1', 'assets/img/questionMark1.png');
		game.load.image('questionMark2', 'assets/img/questionMark2.png');
		game.load.image('questionMark3', 'assets/img/questionMark3.png');
		game.load.image('questionMark4', 'assets/img/questionMark4.png');
		game.load.image('speaker', 'assets/img/speaker.png');
		game.load.image('escucha', 'assets/img/escucha.png');
		game.load.image('avalancha', 'assets/img/avalancha.png');
		game.load.image('restart', 'assets/img/restart.png');
		game.load.image('lee', 'assets/img/lee.png');
		game.load.image('home', 'assets/img/home.png');
		game.load.image('background1', 'assets/img/background1.jpg');
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