function StateView(player, enemies) {

	var player = player;
	var heart = 'images/Heart.png';

	var buttons = {'restart': new CanvasButton("restart"),
					'menu': new CanvasButton("menu")};

	overlay.addEventListener('mousedown', function(e) { handleButtons(e); });

	this.render = function(){
		drawLives();
	};

	this.showEndGame = function(func) {
		var octx = overlayCtx;
		var menuW = 560;
		var menuH = 260;
		var menuCX = overlay.width/2 - menuW/2;
		var menuCY = overlay.height/2 - menuH/2;
		var restartX = overlay.width/2 + 40;
		var restartY = overlay.height/2 + 35;
		overlayCtx.drawImage(Resources.get('images/game-over.png'),menuCX,menuCY);
		overlayCtx.drawImage(Resources.get('images/restart-btn.png'),restartX,restartY);
		buttons["restart"].setDimensions(restartX,restartY,181,56);
		buttons["restart"].enabled = true;
		buttons["restart"].setFunction(func);
	};

	this.clearEndGame = function() {
		Object.keys(buttons).forEach(function(id){
			buttons[id].enabled = false;
		});
	};

	var handleButtons = function(e) {
		Object.keys(buttons).forEach(function(id){
			mouse = getMouse(e);
			if (buttons[id].enabled && 
				buttons[id].contains(mouse.x,mouse.y)){
				buttons[id].func();
			}
		})
	};

	var drawLives = function() {
		var lives = player.lives;
		for (var i = 0; i < lives; i++){
			overlayCtx.drawImage(Resources.get(heart), i * 101, 0);
		};
	};

	var getMouse = function(e) {
		var element = overlay, offsetX = 0, offsetY = 0, mx, my;
		// Compute the total offset
		if (element.offsetParent !== undefined) {
			do {
				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
			}while ((element = element.offsetParent));
		}

		// // Add padding and border style widths to offset
		// // Also add the <html> offsets in case there's a position:fixed bar
		// offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
		// offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

		mx = e.pageX - offsetX;
		my = e.pageY - offsetY;

		// We return a simple javascript object (a hash) with x and y defined
		return {x: mx, y: my};
	}
};

function CanvasButton(id,x,y,w,h,bgFill,text,textFill) {
	this.enabled = false;
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 100;
	this.h = h || 100;
	this.fill = bgFill || "yellow";
	this.text = text || "";
	this.txtFill = textFill || "red";
};
CanvasButton.prototype.draw = function(ctx){
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.textAlign = 'center';
	ctx.textBaseline = "middle";
	ctx.font="30px Verdana";
	ctx.fillStyle = this.txtFill;
	ctx.fillText(this.text,this.x + this.w/2, this.y + this.h/2);
}
CanvasButton.prototype.contains = function(mx, my) {
	return  (this.x <= mx) && (this.x + this.w >= mx) &&
			(this.y <= my) && (this.y + this.h >= my);
};
CanvasButton.prototype.setDimensions = function(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}
CanvasButton.prototype.setFunction = function(func){
	this.func = func;
};