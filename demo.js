var renderer = new PIXI.autoDetectRenderer(800,600, {backgroundColor: 0xFFFFFF});
document.body.appendChild(renderer.view);

var INIT_CIRCLE_X = 400;
var INIT_CIRCLE_Y = 300;
var CIRCLE_RADIUS = 20;

var stage = new PIXI.Container();

var background = new PIXI.Graphics();
background.beginFill(0x00DD88).drawRect(0, 590, 800, 10).endFill();
background.beginFill(0x9AFEFF).drawRect(0, 0, 800, 590).endFill(); 
stage.addChild(background);

var circle = new PIXI.Graphics();
circle.beginFill(0x450000).drawCircle(INIT_CIRCLE_X, INIT_CIRCLE_Y, CIRCLE_RADIUS).endFill();
background.addChild(circle);

function keyboard() {
  var kb = {left: 37, up: 38, right: 39, down: 40};
  kb.pressed = {};
  kb.pressed[kb.left] = false;
  kb.pressed[kb.up] = false;
  kb.pressed[kb.right] = false;
  kb.pressed[kb.down] = false;
  kb.press = undefined;
  kb.release = undefined;

  //The `downHandler`
  var downHandler = function(event) {
    if (event.keyCode >= this.left && event.keyCode <= this.down) {
			if(!this.pressed[event.keyCode] && this.press) this.press(event.keyCode);
			this.pressed[event.keyCode] = true;
    }
    event.preventDefault();
  };

  //The `upHandler`
  var upHandler = function(event) {
    if (event.keyCode >= this.left && event.keyCode <= this.down) {
			if(this.pressed[event.keyCode] && this.release) this.release(event.keyCode);
			this.pressed[event.keyCode] = false;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", downHandler.bind(kb), false
  );
  window.addEventListener(
    "keyup", upHandler.bind(kb), false
  );
  return kb;
}

var ctrl = keyboard();

function loop(){
  requestAnimationFrame(loop);
  nextFrame();
  renderer.render(stage);
}


var g = 9.81;
var jump = 75;
var speed = 10;
var vx = 0;
var vy = 0;


var GROUND = 580 - (INIT_CIRCLE_Y + CIRCLE_RADIUS / 2);
var WALL_LEFT =  - INIT_CIRCLE_X + CIRCLE_RADIUS;
var WALL_RIGHT = 800 - (INIT_CIRCLE_X + CIRCLE_RADIUS);
function nextFrame(){
 
	vx = 0; 
	// gravity applies if position > bottom
  if(circle.position.y < GROUND){
    vy += g;
  } else {
		// if on the ground, no gravity
		vy = 0;
		// jumping only applies when on the ground
		if(ctrl.pressed[ctrl.up]){
			vy = -jump;
		}
	} 

	// left and right movement
	if(circle.position.x > WALL_LEFT){
		if(ctrl.pressed[ctrl.left]){
			vx = -speed;
		}
	} 
	if(circle.position.x < WALL_RIGHT){
		if(ctrl.pressed[ctrl.right]){
			vx = speed;
		}
	}
	// Update the circle position according to new velocity
  circle.position.x += vx;
  circle.position.y += vy;

	if(circle.position.x < WALL_LEFT){
		circle.position.x = WALL_LEFT;
	}
	if(circle.position.x > WALL_RIGHT){
		circle.position.x = WALL_RIGHT;
	}

	if(circle.position.y > GROUND){
		circle.position.y = GROUND;
	}
}

loop();
