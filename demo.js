var W = 800;
var H = 600;
var GROUND_THICKNESS = 10;
var GRAVITY = 1;

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
player.place(20, 500);
sky.addChild(player.avatar);
var bigBounds;
function loop(){
	requestAnimationFrame(loop);

	ball.refresh();
	player.refresh();

  // compute collisions between the ball and the player
  var playerBounds = player.avatar.getBounds();
  bigBounds = new PIXI.Rectangle(playerBounds.x - BALL_RADIUS, playerBounds.y - BALL_RADIUS, playerBounds.width + BALL_RADIUS *2, playerBounds.height + BALL_RADIUS * 2);
  if(bigBounds.contains(ball.position.x, ball.position.y)){
    console.log("HIT THE BALL");
    ball.release();
    // compute the force applied to the ball
    var dir = new PIXI.Point(0,0);
    if(player.position.y > ball.position.y){
      dir.y = -10;
    }

    // x of the center of the player
    var x = player.position.x + player.avatar.width/2;
    if(x < ball.position.x){
      dir.x = 1;
    } 
    if(x > ball.position.x){
      dir.x = -1;
    }

    ball.push(dir.x, dir.y);
  } 

	renderer.render(stage);
}

loop();
