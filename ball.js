function Ball(avatar){
  // Visual representation of the ball
  this.avatar = avatar;
  this.velocity = {
    x: 0,
    y: 0
  };
  this.direction = {
    x: 0,
    y: 0
  };
  this.push = {
		x: false,
		y: false
	};
}

Ball.prototype.refresh = function(){
  var pos = this.avatar.position;
  var v = this.velocity;

	// gravity applies if position > bottom
	if(pos.y < GROUND){
    v.y += gravity;
	} else {
    v.y = 0;
    // on the ground, lose horizontal speed
    v.x = 0.75 * v.x;
  }

  // apply the direction to the velocity
  if(this.push.x){
    v.x += this.direction.x * jump;
    this.push.x = false;
  }
  if(this.push.y){
    v.y += this.direction.y * jump;
    this.push.y = false;
	}
	// compute the new avatar position according to new velocity
	var x = pos.x + v.x;
  var	y = pos.y + v.y;

  if(x <= WALL_LEFT){
    x = WALL_LEFT;
    this.direction.x = Math.abs(this.direction.x) * 0.75;
    this.push.x = true;
  }
  if(x >= WALL_RIGHT){
    x = WALL_RIGHT;
    this.direction.x = - Math.abs(this.direction.x) * 0.75;
    this.push.x = true;
  }
  if(y >= GROUND){
    y = GROUND;
    this.direction.y = v.y > 5 ? (- Math.abs(v.y) * 0.75 / jump) : 0;
    this.push.y = true;
  } 

	pos.x = x;
	pos.y = y;
}
