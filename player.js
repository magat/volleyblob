var JUMP = new PIXI.Point(5,-20);
var FRICTION = 0.1;
var MIN_VELOCITY = 0.5;

function createPlayer(){
  var ctrl = keyboard();
  // Visual representation of the player
  var rect = new PIXI.Graphics();
  rect.beginFill(0x689232).drawRect(0,0,50,100).endFill();

  var p = new Movable(rect);

  var dir = new PIXI.Point(0,0);

  p.onRefresh = function(){
    // the player loses horizontal velocity due to friction
    if(!ctrl.pressed[ctrl.right] && !ctrl.pressed[ctrl.left]){
      if(dir.x == 0 && this.velocity.x != 0){
        if(Math.abs(this.velocity.x) > MIN_VELOCITY){
          dir.x = this.velocity.x * -FRICTION;
        } else {
          dir.x = 0;
          this.velocity.x = 0;
        }
      }	
    }

    var bottom = ground.y - 100;
    if(this.position.y >= bottom){
      // do not go underground
      this.position.y = bottom;
      this.velocity.y = 0;
    } else {
      dir.y = GRAVITY;
    }

    // The walls limit our moves
    this.position.x = Math.max(WALL_LEFT, this.position.x);
    this.position.x = Math.min(WALL_RIGHT - 50, this.position.x);

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
      p.velocity.x = 0;
    }
    if(key == ctrl.left){
      dir.x = -JUMP.x;
      p.velocity.x = 0;
    }
  };

	p.center = function(){
		return new PIXI.Point(this.position.x + 25, this.position.y + 50);
	}
  return p;
}

