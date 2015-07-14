function Movable(avatar){
	// Visual representation of the movable (a PIXI graphics or sprite)
	this.avatar = avatar;
	this.position = avatar.position;
	this.velocity = new PIXI.Point(0,0);
	this.direction = new PIXI.Point(0,0);
	this.onRefresh = undefined;
	this.frozen = false;
}

Movable.prototype.place = function(x,y){
	this.position.set(x,y);
};

Movable.prototype.push = function(x, y){
	this.direction.set(x, y);
};

Movable.prototype.freeze = function(){
	this.frozen = true;
};

Movable.prototype.release = function(){
	this.frozen = false;
};

Movable.prototype.refresh = function(){
	if(!this.frozen){
		// apply the direction to the velocity
		this.velocity.x += this.direction.x;
		this.velocity.y += this.direction.y;

		// apply the velocity to the position
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		// reset direction data
		this.push(0,0);

		if(this.onRefresh !== undefined){
			this.onRefresh.apply(this);
		}

	}
}
