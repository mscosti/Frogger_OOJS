
function FroggerGameController(global, enemies, player) {
    this.allEnemies = enemies;
    this.player = player;
    this.lastTime;

    var viewManager = new ViewManager(this,global.document, global.window);
    var win = global.window;
    var self = this;

    // initialize and load all resources the game and viewManager needs
    viewManager.init();

    this.main = function main() {
        viewManager.render();
        /**
            main game logic loop
            Will handle telling viewManager to render,
            managiing time in the game,
            checking collisions,
            checking player events like health, getting items etc,
            determining win/loss
        **/
        // console.log(this.viewManager);
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

var global = this;
$( document ).ready(function() {
    var frogger = new FroggerGameController(global, [], {});
    frogger.startGame();
});
