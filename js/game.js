var game = new Phaser.Game(800, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update }, true);

function preload() {
  game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.image('plane', 'assets/plane.png');
  game.load.image('rock', 'assets/rock.png');
}

function create() {
  game.add.sprite(0, 0, 'background');
  game.add.sprite(0, game.world.height - 71, 'ground');

  var plane = game.add.sprite(game.world.centerX, game.world.centerY, 'plane');
  plane.anchor.setTo(0.5, 0.5);
}

function update() {

}
