/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



var Moveable = function(sprite, init_x, init_y) {
    this.sprite = sprite;
    this.x = init_x;
    this.y = init_y;
}
Moveable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Moveable.prototype.randXFromCol= function(min,max) {
    var col = getRandomInt(min,max);
    return this.colToX(col);
}
Moveable.prototype.randYFromRows = function(min,max) {
    var row = getRandomInt(min,max);
    return this.rowToY(row);
}
Moveable.prototype.rowToY = function(row){ return row * 80; }
Moveable.prototype.colToX = function(col){ return col * 101; }