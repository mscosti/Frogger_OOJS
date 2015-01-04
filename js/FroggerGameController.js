
function FroggerGameController(global, enemies, player) {
    this.allEnemies = enemies;
    this.player = player;
    this.viewManager = new viewManager(this,global.document, global.window);
    this.lastTime;

    var win = global.window;

    this.viewManager.init();

    this.main = function main() {
        this.viewManager.render();
        /**
            main game logic loop
            Will handle telling viewManager to render,
            managiing time in the game,
            checking collisions,
            checking player events like health, getting items etc,
            determining win/loss
        **/
        console.log(this.viewManager);
        // win.requestAnimationFrame(main);
    };


    this.startGame = function(){
        console.log(this.viewManager.ready);
        if (this.viewManager.ready){
            this.reset();
            lastTime = Date.now();
            this.main();
        }
        else{
            console.log(":(")
        }
    }

    this.reset = function() {
        /**
            TODO: this will be used for cleanup if a new game is to be started
        **/
    }
}
// FroggerGameController.prototype.startGame = function(){
//     console.log(this.viewManager);
//         if (this.viewManager.ready){
//             this.reset();
//             lastTime = Date.now();
//             main();
//         }
//         else{
//             console.log(":(")
//         }
// }

var global = this;
$( document ).ready(function() {
    var frogger = new FroggerGameController(global, [], {});
    console.log(frogger);
    frogger.startGame();
});
