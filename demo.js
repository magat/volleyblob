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

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}


var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

function loop(){
  requestAnimationFrame(loop);
  nextFrame();
  renderer.render(stage);
}

circle.vx = 0;
circle.vy = 0;
var cmdLeft = 0, 
    cmdRight = 0,
    cmdTop = 0,
    cmdBottom = 0;


left.press = function(){
  goLeft = true; 
}
left.release = function(){

}

right.press = function(){
  goRight = true; 
}

function nextFrame(){
  circle.vy = 0;
  circle.vx = 0;
  // gravity applies if position > bottom
  if(circle.position.y < (580 - INIT_CIRCLE_Y - CIRCLE_RADIUS / 2)){
    circle.vy = 5;
  } 

  circle.position.x += circle.vx;
  circle.position.y += circle.vy;
}

loop();
