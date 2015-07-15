var W = 800;
var H = 600;
var GROUND_THICKNESS = 10;
var GRAVITY = 1;

var WALL_LEFT = 0;
var WALL_RIGHT = W;

var renderer = new PIXI.autoDetectRenderer(W, H, {backgroundColor: 0xFFFFFF});
var stage = new PIXI.Container();

// the sky 
var sky = new PIXI.Graphics();
sky.beginFill(0x9AFEFF).drawRect(0, 0, W, H).endFill(); 
stage.addChild(sky);
// the ground
var ground = new PIXI.Graphics();
ground.beginFill(0x00DD88).drawRect(0, 0, W, GROUND_THICKNESS).endFill();
ground.position.y = H - GROUND_THICKNESS;
sky.addChild(ground);

document.body.appendChild(renderer.view);

var ball = createBall();
ball.place(W/2, 2 * H/3);
ball.freeze();
sky.addChild(ball.avatar);

var player = createPlayer();
player.place(W/2 - 25, 500);
sky.addChild(player.avatar);
var bigBounds;

var PLAYER_FORCE = 5;
var PLAYER_INERTIA = 5;

function loop(){
  requestAnimationFrame(loop);

  ball.refresh();
  player.refresh();

  // compute collisions between the ball and the player
  var playerBounds = player.avatar.getBounds();
  bigBounds = new PIXI.Rectangle(playerBounds.x - BALL_RADIUS, playerBounds.y - BALL_RADIUS, playerBounds.width + BALL_RADIUS *2, playerBounds.height + BALL_RADIUS * 2);
  if(bigBounds.contains(ball.position.x, ball.position.y)){
    ball.release();

    // compute the force applied to the ball
    var dir = new PIXI.Point(0,0);
		var posX = ball.center().x - player.center().x;		   
		var posY = ball.center().y - player.center().y;		   

		dir.x = -Math.sign(posX) * PLAYER_FORCE + Math.sign(player.velocity.x) * PLAYER_INERTIA;	
		dir.y = -Math.sign(posY) * PLAYER_FORCE + Math.sign(player.velocity.y) * PLAYER_INERTIA;	
		

    ball.push(dir.x, dir.y);
  } 

  renderer.render(stage);
}

loop();
