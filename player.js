function Player(){

  this.body = Physics.body('rectangle', {
    x: 50,
    y: game.height - 50,
    width: 50,
    height: 100,
    mass: 5
  });

  this.onCollision = function(){
    this.body.sleep(true);
    this.body.sleep(false);
    this.body.state.angular.vel = 0;
  };

  this.ctrl = keyboard();

  var player = this;
  this.ctrl.press = function(key){
    if(key == this.up){
      //player.body.state.vel.set(0, -1); 
      player.body.applyForce(new Physics.vector(0, -1));
    }
    if(key == this.left){
      player.body.applyForce(new Physics.vector(-1, 0));
    }
    if(key == this.right){
      player.body.applyForce(new Physics.vector(1, 0));
    }
  };
}
