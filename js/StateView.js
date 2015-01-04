function StateView(player, enemies) {

	var player = player;
	var heart = 'images/Heart.png';

	this.render = function(){
		drawLives();
	};

	this.update = function(player){
		// player = player;
		// console.log(player.lives);
	};

	var drawLives = function() {
		var lives = player.lives;
		for (var i = 0; i < lives; i++){
			overlayCtx.drawImage(Resources.get(heart), i * 101, 0);
		};
	};
};