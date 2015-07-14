var JUMP = new PIXI.Point(15,-15);

function createPlayer(){
	var ctrl = keyboard();
	var dir = new PIXI.Point(0,0);
	// Visual representation of the player
	var rect = new PIXI.Graphics();
	rect.beginFill(0x689232).drawRect(0,0,50,100).endFill();

	var p = new Movable(rect);

	p.onRefresh = function(){
		// the player loses horizontal velocity all the time
		if(dir.x == 0 && this.velocity.x != 0){
			if(Math.abs(this.velocity.x) > 5){
				dir.x = this.velocity.x * -0.05;
			} else {
				dir.x = 0;
				this.velocity.x = 0;
			}
		}	

		var bottom = ground.y - 100;
		if(this.position.y >= bottom){
			this.position.y = bottom;
			this.velocity.y = 0;
		} else {
			dir.y = GRAVITY;
		}

		this.push(dir.x, dir.y);
		dir.x = 0;
		dir.y = 0;
	};


	ctrl.press = function(key){
		if(key == ctrl.up){
			dir.y = JUMP.y;
		}
		if(key == ctrl.right){
			dir.x = JUMP.x;
		}
		if(key == ctrl.left){
			dir.x = -JUMP.x;
		}
	};
	return p;
}


/*
	 Player.prototype.refresh = function(){
	 var pos = this.avatar.position;
	 var v = this.velocity;

// gravity applies if position > bottom
if(pos.y < GROUND){
v.y += gravity;
} else {
// jumping only applies when on the ground
v.y = this.ctrl.goup() ? -jump : 0;
} 

// left and right movement, only when close to the ground
if(pos.y > (GROUND-20)){
v.x = this.ctrl.goleft() ? -speed : (this.ctrl.goright() ? speed : 0);
}

// compute the new avatar position according to new velocity
// while handling the bounds
var x = Math.max(pos.x + v.x, WALL_LEFT);
x = Math.min(x, WALL_RIGHT);
var	y = Math.min(pos.y + v.y, GROUND);

pos.x = x;
pos.y = y;
}*/
