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
		var dir = new PIXI.Point(0,0);
		var bottom = ground.y - BALL_RADIUS;
		if(this.position.y >= bottom){
			this.position.y = bottom;

			// bouncing on the floor
			if(this.velocity.y > BOUNCE_SPEED){
				dir.y = -ball.velocity.y * (1 + BOUNCE_FACTOR); 			
			}

			// friction applies on the floor
			if(this.velocity.x != 0){
				if(Math.abs(this.velocity.x) > MIN_VELOCITY){
					dir.x = this.velocity.x * -FRICTION;
				} else {
					dir.x = 0;
					this.velocity.x = 0;
				}
			}	

		} else {
			//if not on the floor, gravity applies
			dir.y = GRAVITY;
		}

		// bouncing on the walls
		if(this.position.x <= WALL_LEFT+BALL_RADIUS){
			this.position.x = WALL_LEFT+BALL_RADIUS;
			dir.x = 5;
		}
		if(this.position.x >= WALL_RIGHT-BALL_RADIUS){
			this.position.x = WALL_RIGHT-BALL_RADIUS;
			dir.x =-5;
		}
		this.push(dir.x, dir.y);
	};

	b.center = function(){
		return new PIXI.Point(this.position.x, this.position.y);
	}
	return b;
}
