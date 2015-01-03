var renderOverlay = function(){

	drawLives();
}

var drawLives = function() {
	var heart = 'images/Heart.png';
	var lives = player.lives;

	for (var i = 0; i < lives; i++){
		overlayCtx.drawImage(Resources.get(heart), i * 101, 0);
	}
}