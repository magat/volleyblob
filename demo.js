var W = 800;
var H = 600;
var BALL_RADIUS = 20;
var GROUND_THICKNESS = 10;
var GRAVITY = 1;

// under this speed, the ball won't bounce on the floor
var BOUNCE_SPEED = 5;
// factor makes the vertical speed after a bounce
var BOUNCE_FACTOR = 0.605;

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

var circle = new PIXI.Graphics();
circle.beginFill(0x450000).drawCircle(0, 0, BALL_RADIUS).endFill();
circle.position.x = W/2;
circle.position.y = H/2;
sky.addChild(circle);

//var p1 = new Player(circle);
var ball = new Ball(circle);
var kb = keyboard();

var jump = 15;
var speed = 5;

kb.press = function(key){
  switch(key){
    case this.up:
      ball.push(0, -jump);
      break;
    case this.down:
      ball.push(0, jump);
      break;
    case this.left:
      ball.push(-jump, 0);
      break;
    case this.right:
      ball.push(jump, 0);
      break;
  }
}

function handleBallCollisions(){
  //TODO on the ground, lose horizontal speed
  // ball bounces on the floor
  if(circle.position.y >= (ground.y - BALL_RADIUS)){
    circle.position.y = ground.y - BALL_RADIUS;
    if(ball.velocity.y > 5){
      ball.push(0, -ball.velocity.y * (1 + BOUNCE_FACTOR));
    } 
  } else {
    //if not on the floor, gravity applies
    ball.push(0, GRAVITY);
  }
}

function loop(){
  requestAnimationFrame(loop);

  // compute new ball position
  ball.refresh();
  handleBallCollisions();

  renderer.render(stage);
}

loop();
