class bootState {

	create() {

		// Starting the physics system - in this case we are using the
		// simple (but effective) ARCADE physics engine
		game.physics.startSystem(Phaser.Physics.Arcade);

		// Calling the load state
		game.state.start('load');
	}

}