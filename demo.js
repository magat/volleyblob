var INIT_CIRCLE_X = 400;
var INIT_CIRCLE_Y = 300;
var CIRCLE_RADIUS = 20;
var GROUND = 580 - (INIT_CIRCLE_Y + CIRCLE_RADIUS / 2);
var WALL_LEFT =  - INIT_CIRCLE_X + CIRCLE_RADIUS;
var WALL_RIGHT = 800 - (INIT_CIRCLE_X + CIRCLE_RADIUS);


var renderer = new PIXI.autoDetectRenderer(800,600, {backgroundColor: 0xFFFFFF});
var stage = new PIXI.Container();
// the sky and ground
var background = new PIXI.Graphics();
background.beginFill(0x00DD88).drawRect(0, 590, 800, 10).endFill();
background.beginFill(0x9AFEFF).drawRect(0, 0, 800, 590).endFill(); 
stage.addChild(background);

document.body.appendChild(renderer.view);

var circle = new PIXI.Graphics();
circle.beginFill(0x450000).drawCircle(INIT_CIRCLE_X, INIT_CIRCLE_Y, CIRCLE_RADIUS).endFill();
background.addChild(circle);

//var p1 = new Player(circle);
var ball = new Ball(circle);
var kb = keyboard();
kb.press = function(key){
  switch(key){
    case this.up:
      ball.direction.y = -1;
      break;
    case this.down:
      ball.direction.y = 1;
      break;
    case this.left:
      ball.direction.x = -1;
      break;
    case this.right:
      ball.direction.x = 1;
      break;
  }

}
function loop(){
	requestAnimationFrame(loop);
	
  ball.refresh();
  
  renderer.render(stage);
}

var gravity = 1;
var jump = 15;
var speed = 5;

loop();
