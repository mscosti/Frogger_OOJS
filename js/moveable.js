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
	// console.log(this.y.toString() + " " + moveable.y.toString());
	var c1 = {x: this.x + (this.width/2), 
			  y: this.y - (this.height/2)};
	var c2 = {x: moveable.x + (moveable.width/2), 
			  y: moveable.y - (moveable.height/2)};
	if (this.xToCol(c1.x) == this.xToCol(c2.x) && 
		this.yToRow(c1.y) == this.yToRow(c2.y)) {
			return true;
		}
	else return false;
}
Moveable.prototype.render = function() {
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