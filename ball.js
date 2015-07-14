var BALL_COLOR = 0x450000;
var BALL_RADIUS = 20;
// under this speed, the ball won't bounce on the floor
var BOUNCE_SPEED = 5;
// factor makes the vertical speed after a bounce
var BOUNCE_FACTOR = 0.605;

function createBall(){
	var circle = new PIXI.Graphics();
	circle.beginFill(BALL_COLOR).drawCircle(0, 0, BALL_RADIUS).endFill();

	var b = new Movable(circle);

	b.onRefresh = function(){
		var bottom = ground.y - BALL_RADIUS;
		if(this.position.y >= bottom){
			this.position.y = bottom;
			if(this.velocity.y > BOUNCE_SPEED){
				this.push(0, -ball.velocity.y * (1 + BOUNCE_FACTOR)); 			
			}
		} else {
			//if not on the floor, gravity applies
			this.push(0, GRAVITY);
		}
	};

	return b;
}
