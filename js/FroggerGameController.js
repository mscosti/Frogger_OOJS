
function FroggerGameController(global, enemies, player) {
    var self = this;

    var allEnemies = enemies;
    var player = player;
    var lastTime;

    var viewManager = new ViewManager(this,global);
    var win = global.window;

    // initialize and load all resources the game and viewManager needs
    viewManager.init();
    viewManager.addRenderables(enemies);
    viewManager.addRenderables(player);

    this.main = function main() {
        /**
            main game logic loop
            managiing time in the game,
            checking collisions,
            checking player events like health, getting items etc,
            determining win/loss
        **/
        viewManager.render();
        win.requestAnimationFrame(main);
    };


    this.startGame = function startGame(){

        if (viewManager.loaded){
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
    frogger.startGame();
});
