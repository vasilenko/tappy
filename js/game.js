var game = new Phaser.Game(800, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update }, true);

var background;
var ground;
var plane;

var platformWidth = 808;
var platformHeight = 70;

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

  var groundCollisionGroup = game.physics.p2.createCollisionGroup();
  var planeCollisionGroup = game.physics.p2.createCollisionGroup();

  background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');

  // Set up Ground

  ground = game.add.group();

  for (var i = 0; i < 2; i++) {
    var platform = ground.create(platformWidth * (i + 0.5), game.world.height - platformHeight / 2, 'ground');
    game.physics.p2.enable(platform);

    platform.body.static = true;
    platform.body.clearShapes();
    platform.body.loadPolygon('shapes', 'ground');
    platform.body.setCollisionGroup(groundCollisionGroup);
    platform.body.collides(planeCollisionGroup);
  }

  // Set up Plane

  plane = game.add.sprite(game.world.centerX, game.world.centerY, 'plane');
  game.physics.p2.enable(plane);

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

  ground.children.forEach(function(platform, index) {
    platform.body.velocity.x = -200;

    if (platform.x <= platformWidth / -2) {
      var nextPlatform = ground.children[Math.abs(index - 1)];
      platform.body.x = nextPlatform.x + platformWidth;
    }
  });
}
