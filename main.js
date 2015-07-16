var player;
var game = {
  width: 800,
  height: 600,
  el: 'body'
};

Physics(function(world){
  // use pixi renderer
  world.add(Physics.renderer('pixi', game));

  // the sky 
  var sky = new PIXI.Graphics();
  sky.beginFill(0x9AFEFF).drawRect(0, 0, game.width, game.height).endFill(); 
  world.renderer().stage.addChild(sky);

  // the ground
  world.add(Physics.body('rectangle', {
    x: game.width / 2,
    y: game.height - 5,
    width: game.width,
    height: 10,
    restitution: 0.8,
    treatment: 'static'
  }));

  // the player
  player = new Player();
  world.add(player.body);

  // the ball
  var ball = Physics.body('circle', {
    x: 50, 
    y: 30, 
    vx: 0.2, 
    vy: 0.01, 
    radius: 20
  }); 
  world.add(ball);

  // collisions with the edges of the game
  world.add(Physics.behavior('edge-collision-detection', { aabb: Physics.aabb(0, 0, game.width, game.height), restitution: 0.8 }));
  // activate collision detection between bodies 
  world.add(Physics.behavior('body-collision-detection'));
  // ensure objects bounce when edge collision is detected
  world.add( Physics.behavior('body-impulse-response') );
  // add some gravity
  world.add( Physics.behavior('constant-acceleration') );
  // recommendend collision detection method
  world.add(Physics.behavior('sweep-prune'));


  world.on('collisions:detected', function(data, e) {
    player.onCollision();
  });


  // Every tick, update the world physics and render
  Physics.util.ticker.on(function(time) { 
    world.step(time); 
    world.render();
  });
});


Physics.util.ticker.start();
