var game = new Phaser.Game(800, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update }, true);

var background;
var ground;
var plane;

function preload() {
  game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.image('rock', 'assets/rock.png');

  game.load.spritesheet('plane', 'assets/plane.png', 88, 73);
}

function create() {
  background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
  ground = game.add.tileSprite(0, game.world.height - 71, game.world.width, 71, 'ground');

  plane = game.add.sprite(game.world.centerX, game.world.centerY, 'plane');
  plane.anchor.setTo(0.5, 0.5);
  plane.animations.add('fly', [0, 1, 2, 1], 10, true);
  plane.animations.play('fly');
}

function update() {
  background.tilePosition.x -= 0.25;
  ground.tilePosition.x -= 1;
}
