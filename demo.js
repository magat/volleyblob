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
ball.place(W/2, H/2);
ball.freeze();
sky.addChild(ball.avatar);

var player = createPlayer();
player.place(20, 500);
sky.addChild(player.avatar);


function loop(){
	requestAnimationFrame(loop);

	ball.refresh();
	player.refresh();

	renderer.render(stage);
}

loop();
