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
  this.push = false;
}

Ball.prototype.refresh = function(){
  var pos = this.avatar.position;
  var v = this.velocity;

	// gravity applies if position > bottom
	if(pos.y < GROUND){
    v.y += gravity;
	} else {
    v.x = 0;
    v.y = 0;
    // on the ground, lose horizontal speed
    this.direction.x = 0.75 * this.direction.x;
  }

  // apply the direction to the velocity
  if(this.push){
    v.x += this.direction.x * jump;
    v.y += this.direction.y * jump;
    this.push = false;
  }

	// compute the new avatar position according to new velocity
	var x = pos.x + v.x;
  var	y = pos.y + v.y;


  if(x <= WALL_LEFT){
    x = WALL_LEFT;
    this.direction.x = Math.abs(this.direction.x);
    this.push = true;
  }
  if(x >= WALL_RIGHT){
    x = WALL_RIGHT;
    this.direction.x = - Math.abs(this.direction.x);
    this.push = true;
  }
  if(y >= GROUND){
    y = GROUND;
    this.direction.y = this.direction.y * -0.75;
    this.push = true;
  } 

	pos.x = x;
	pos.y = y;
}
