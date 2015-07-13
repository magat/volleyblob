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
}

Ball.prototype.push = function(x, y){
  this.direction.x = x;
  this.direction.y = y;
};

Ball.prototype.refresh = function(){
  // apply the direction to the velocity
  this.velocity.x += this.direction.x;
  this.velocity.y += this.direction.y;

  // apply the velocity to the position
  this.avatar.position.x += this.velocity.x;
  this.avatar.position.y += this.velocity.y;

  // reset direction data
  this.push(0,0);
}
