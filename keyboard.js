function keyboard() {
	// arrow keys codes
	var kb = {left: 37, up: 38, right: 39, down: 40};
	kb.pressed = {};
	kb.pressed[kb.left] = false;
	kb.pressed[kb.up] = false;
	kb.pressed[kb.right] = false;
	kb.pressed[kb.down] = false;
	kb.press = undefined;
	kb.release = undefined;

	//The `downHandler`
	var downHandler = function(event) {
		if (event.keyCode >= this.left && event.keyCode <= this.down) {
			if(!this.pressed[event.keyCode] && this.press) this.press(event.keyCode);
			this.pressed[event.keyCode] = true;
		}
		event.preventDefault();
	};

	//The `upHandler`
	var upHandler = function(event) {
		if (event.keyCode >= this.left && event.keyCode <= this.down) {
			if(this.pressed[event.keyCode] && this.release) this.release(event.keyCode);
			this.pressed[event.keyCode] = false;
		}
		event.preventDefault();
	};

	//Attach event listeners
	window.addEventListener(
			"keydown", downHandler.bind(kb), false
			);
	window.addEventListener(
			"keyup", upHandler.bind(kb), false
			);
	return kb;
}
