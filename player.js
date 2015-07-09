function Player(avatar){
  this.ctrl = keyboard();
  // Visual representation of the player
  this.avatar = avatar;
  this.velocity = {
    x: 0,
    y: 0
  }
}

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
}
