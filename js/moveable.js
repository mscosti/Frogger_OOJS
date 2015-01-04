/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var Moveable = function(sprite, init_row, init_col, width, height) {
    this.sprite = sprite;
    this.width = width;
    this.height = height;
    this.moveTo(init_row,init_col);
}
/**
 * Check for collisions between two moveable pieces' centroids
 */
Moveable.prototype.checkCollision = function (moveable){
	var circle1 = {radius: this.width/3, x: this.x, y: this.y};
	var circle2 = {radius: moveable.width/3, x: moveable.x, y: moveable.y};

	var dx = (circle1.x + circle1.radius) - (circle2.x + circle2.radius);
	var dy = (circle1.y + circle1.radius) - (circle2.y + circle2.radius);
	var distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < circle1.radius + circle2.radius) return true
	else return false
}
Moveable.prototype.render = function(ctx,overlayCtx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Moveable.prototype.moveTo = function(row,col,y_offset) {
	y_offset = typeof y_offset !== 'undefined' ? y_offset : 0;
	this.x = this.colToX(col);
    this.y = this.rowToY(row) + y_offset;
}
Moveable.prototype.randXFromCol= function(min,max) {
    var col = getRandomInt(min,max);
    return this.colToX(col);
}
Moveable.prototype.randYFromRows = function(min,max) {
    var row = getRandomInt(min,max);
    return this.rowToY(row);
}
Moveable.prototype.rowToY = function(row){ return row * 83; }
Moveable.prototype.colToX = function(col){ return col * 101; }
Moveable.prototype.yToRow = function(y){ return Math.round(y/83); }
Moveable.prototype.xToCol = function(x){ return Math.round(x/101); }