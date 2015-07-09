var renderer = new PIXI.autoDetectRenderer(800,600, {backgroundColor: 0xFFFFFF});
document.body.appendChild(renderer.view);

var INIT_CIRCLE_X = 400;
var INIT_CIRCLE_Y = 300;
var CIRCLE_RADIUS = 20;
var GROUND = 580 - (INIT_CIRCLE_Y + CIRCLE_RADIUS / 2);
var WALL_LEFT =  - INIT_CIRCLE_X + CIRCLE_RADIUS;
var WALL_RIGHT = 800 - (INIT_CIRCLE_X + CIRCLE_RADIUS);

var stage = new PIXI.Container();


// the sky and ground
var background = new PIXI.Graphics();
background.beginFill(0x00DD88).drawRect(0, 590, 800, 10).endFill();
background.beginFill(0x9AFEFF).drawRect(0, 0, 800, 590).endFill(); 
stage.addChild(background);

var circle = new PIXI.Graphics();
circle.beginFill(0x450000).drawCircle(INIT_CIRCLE_X, INIT_CIRCLE_Y, CIRCLE_RADIUS).endFill();
background.addChild(circle);

var ctrl = keyboard();

function loop(){
	requestAnimationFrame(loop);
	nextFrame();
	renderer.render(stage);
}


var g = 1;
var jump = 15;
var speed = 5;

circle.vx = 0;
circle.vy = 0;

function nextFrame(){

	// gravity applies if position > bottom
	if(circle.position.y < GROUND){
		circle.vy += g;
	} else {
		// if on the ground, no gravity
		circle.vy = 0;
		// jumping only applies when on the ground
		if(ctrl.pressed[ctrl.up]){
			circle.vy = -jump;
		}
	} 

	// left and right movement
  if(circle.position.y > (GROUND-20)){
    circle.vx = 0; 
    if(ctrl.pressed[ctrl.left]){
      circle.vx = -speed;
    }
    if(ctrl.pressed[ctrl.right]){
      circle.vx = speed;
    }
  }

	// compute the new circle position according to new velocity
	var x = circle.position.x + circle.vx;
	var y = circle.position.y + circle.vy;

	if(x < WALL_LEFT){
		x = WALL_LEFT;
	}

	if(x > WALL_RIGHT){
		x = WALL_RIGHT;
	}

	if(y > GROUND){
		y = GROUND;
	}
	circle.position.x = x;
	circle.position.y = y;
}

loop();
