
var FroggerGameController = function(global, enemies, player) {
	this.allEnemies = enemies;
	this.player = player;
	this.viewManager = new viewManager(this,global.document, global.window);
	this.lastTime;

	var win = global.window;
// 
	this.init = function(){
		/**
			create a view manager that handles all drawing.
			Initializing the viewManager loads resources to
			play the game, and automatically calls the game controlller
			method startGame once they are loaded to indicate the game
			can now start
		**/
		viewManager.init();
		main();
		// win.requestAnimationFrame(this.init);
	};

	function main() {
		// this.viewManager.render();
		/**
			main game logic loop
			Will handle telling viewManager to render,
			managiing time in the game,
			checking collisions,
			checking player events like health, getting items etc,
			determining win/loss
		**/
		console.log(viewManager);
		win.requestAnimationFrame(main);
	};

	this.startGame = function(){
		this.reset();
        lastTime = Date.now();
        this.main();
	}

	this.reset = function() {
		/**
			TODO: this will be used for cleanup if a new game is to be started
		**/
	}
}

var global = this;
$( document ).ready(function() {
    var frogger = new FroggerGameController(global, [], {});
	frogger.init();
});
