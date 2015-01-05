function StateView(player, enemies) {

	var player = player;
	var heart = 'images/Heart.png';
	var buttons = {};
	var restartBtn = new CanvasButton("restart",300,300,200,50,"blue","restart","orange");
	buttons["restart"] = restartBtn;

	console.log(overlay);
	overlay.addEventListener('mousedown', function(e) { handleButtons(e); });

	this.render = function(){
		drawLives();
	};

	this.showEndGame = function(func) {
		var octx = overlayCtx;
		buttons["restart"].draw(octx);
		buttons["restart"].enabled = true;
		buttons["restart"].setFunction = func;
	};

	var handleButtons = function(e) {
		Object.keys(buttons).forEach(function(id){
			mouse = getMouse(e);
			if (buttons[id].enabled && 
				buttons[id].contains(mouse.x,mouse.y)){
				console.log("click");
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
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.fill = bgFill || "yellow";
	this.text = text || "helloo";
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
CanvasButton.prototype.setFunction = function(func){
	this.func = func;
};