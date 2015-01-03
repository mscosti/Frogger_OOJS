var checkEnemyCollisionsWithPlayer = function() {
    allEnemies.forEach(function(enemy) {
        var collide = enemy.checkCollision(player);
        if (collide) player.hit();
    });
}


// Enemies our player must avoid
var Enemy = function() {
    this.y_offset = -20;
    Moveable.call(this,'images/enemy-bug.png',0,0,98,101);
    Enemy.prototype.constructor = Enemy;
    this.reSpawn();
    
}
Enemy.prototype = Object.create(Moveable.prototype);

Enemy.prototype.reSpawn = function(){
    this.offScreen = false;
    this.respawnDelay = getRandomInt(500,2000);
    this.velocity = getRandomInt(40,200); // px per second
    this.x = this.colToX(0); 
    this.y = this.randYFromRows(2,4) + this.y_offset;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if ( this.x > ctx.canvas.width ) {
        // Lock once entered to ensure multiple
        // timeOut callbacks are set up while waiting
        // for the reSpawn to happen
        if (!this.offScreen){
            this.offScreen = true;
            console.log("HIII");
            var that = this;
            setTimeout( function(){that.reSpawn()}, that.respawnDelay );
        }
    }
    else{
        var displacement = (this.velocity * dt);
        this.x = this.x + displacement;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.lives = 3;
    this.y_offset = -35; // 25 pixels to center feet in tiles
    this.row = 5;
    this.col = 2;
    Moveable.call(this, 'images/char-boy.png', this.row, this.col,98,101);
    Player.prototype.constructor = Player;
}
Player.prototype = Object.create(Moveable.prototype);

Player.prototype.hit = function() {
    this.lives -= 1;
    this.row = 5;
    this.col = 2;
    this.moveTo(this.row,this.col,this.y_offset);
}

Player.prototype.update = function() {
    this.moveTo(this.row, this.col,this.y_offset);
}


Player.prototype.handleInput = function(direction) {
    switch(direction){
        case 'down':
            if (this.row < 6){
                this.row++;
            }
            break;
        case 'up':
            if (this.row > 1){
                this.row--;
            }
            break;
        case 'left':
            if (this.col > 0){
                this.col--;
            }
            break;
        case 'right':
            if (this.col < 4){
                this.col++;
            }
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numEnemies = 1;
allEnemies = [];
for (var i = 0; i < numEnemies; i++){
    allEnemies.push(new Enemy());
}

player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

