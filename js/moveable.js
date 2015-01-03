/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



var Moveable = function(sprite, init_row, init_col) {
    this.sprite = sprite;
    this.moveTo(init_row,init_col);
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