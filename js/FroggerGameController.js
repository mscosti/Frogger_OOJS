
function FroggerGameController(global, enemies, player) {
    var self = this;

    var allEnemies = enemies;
    var player = player;
    var lastTime;
    var gameOver = false;

    var viewManager = new ViewManager(this,global);
    var stateView = new StateView(player);
    var win = global.window;

    // initialize and load all resources the game and viewManager needs
    viewManager.init();
    viewManager.addRenderables(enemies);
    viewManager.addRenderables(player);
    viewManager.addRenderables(stateView);

    this.main = function main() {
        if (gameOver){
            self.endGame();
            return;
        }
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        /**
            main game logic loop
            checking player events like health, getting items etc,
            determining win/loss
        **/
        self.updateEntities(dt);
        self.checkEnemyCollisionsWithPlayer();
        self.checkGameOver();
        viewManager.render();

        lastTime = now;

        win.requestAnimationFrame(main);
    };


    this.startGame = function startGame(){

        if (viewManager.loaded){
            self.reset();
            lastTime = Date.now();
            self.main();
        }
        else{
            /*
              Check if the viewManager is loaded again
              whenever we would normally be ready for animation
            */
            win.requestAnimationFrame(startGame)
        }
    };

    this.checkGameOver = function(){
        if (player.lives == 0){
            console.log("gameover");
            gameOver = true;
        }
    }

    this.endGame = function(){
        console.log("game over");
    }

    this.updateEntities = function(dt){
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
        stateView.update(player);
    }

    this.checkEnemyCollisionsWithPlayer = function() {
        allEnemies.forEach(function(enemy) {
            var collide = enemy.checkCollision(player);
            if (collide) player.hit();
        });
    }

    this.keyHandle = function keyHandle(e){
        var playerKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        // example of other key stuff
        var uiKeys = {

        };
        console.log(e.keyCode);
        player.handleInput(playerKeys[e.keyCode]);
    }

    this.reset = function() {
        /**
            TODO: this will be used for cleanup if a new game is to be started
        **/
    };
}

// Temporary calling script until controller factory is written
var global = this;
$( document ).ready(function() {
    var numEnemies = 3;
    allEnemies = [];
    for (var i = 0; i < numEnemies; i++){
    allEnemies.push(new Enemy());
    }

    player = new Player();

    var frogger = new FroggerGameController(global, allEnemies, player);
    document.addEventListener('keyup', function(e){frogger.keyHandle(e);} );
    frogger.startGame();
});
