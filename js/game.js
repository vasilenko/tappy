var game = new Phaser.Game(800, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update }, true);

var background;
var ground;
var plane;

function preload() {
  game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.image('rock', 'assets/rock.png');
  game.load.spritesheet('plane', 'assets/plane.png', 88, 73);
  game.load.physics('shapes', 'assets/shapes.json');
}

function create() {
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.setImpactEvents(true);
  game.physics.p2.gravity.y = 200;

  background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
  ground = game.add.sprite(404, game.world.height - 35, 'ground');
  plane = game.add.sprite(game.world.centerX, game.world.centerY, 'plane');

  game.physics.p2.enable([ground, plane]);

  var groundCollisionGroup = game.physics.p2.createCollisionGroup();
  var planeCollisionGroup = game.physics.p2.createCollisionGroup();

  ground.body.static = true;
  ground.body.clearShapes();
  ground.body.loadPolygon('shapes', 'ground');
  ground.body.setCollisionGroup(groundCollisionGroup);
  ground.body.collides(planeCollisionGroup);

  plane.body.clearShapes();
  plane.body.loadPolygon('shapes', 'plane');
  plane.body.setCollisionGroup(planeCollisionGroup);
  plane.body.collides(groundCollisionGroup, function() {
    plane.kill();
  });

  plane.animations.add('fly', [0, 1, 2, 1], 10, true);
  plane.animations.play('fly');

  plane.inputEnabled = true;
  plane.events.onInputDown.add(function() {
    plane.body.velocity.y = -200;
  });
}

function update() {
  background.tilePosition.x -= 0.25;
}
