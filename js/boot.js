class bootState {

	create() {

		// Starting the physics system - in this case we are using the
		// simple (but effective) ARCADE physics engine
		game.physics.startSystem(Phaser.Physics.Arcade);
		if(this.game.device.cordova) {

			scaleRatio = window.devicePixelRatio / 3;

		}else if(this.game.device.desktop == true) {

			scaleRatio = window.devicePixelRatio / 1;

		} else {
			scaleRatio = window.devicePixelRatio / 1;
		}
		// Calling the load state
		game.state.start('load');
	}

}