

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

// Here we add each state. We give it a casual name that we use when 
// calling it (i.e. 'boot'), and an official name that we use when
// defining it (i.e. bootState), as you'll see in the boot.js file

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('lee', lee);
game.state.add('escucha', escucha);
game.state.add('avalancha', avalancha);
game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.add('win2', winState2);
game.state.add('lose2', loseState2);

// After all of th estates are added, we start the game by calling the
// boot state
game.state.start('boot');