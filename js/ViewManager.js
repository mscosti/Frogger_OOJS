var viewManager = function(gameManager, doc, win){
    // reference back to itself for callback access to this
    var self = this;

    var gameManager = gameManager,
        canvas = $('#game')[0],
        overlay = $('#overlay')[0],
        ctx = canvas.getContext('2d'),
        overlayCtx = overlay.getContext('2d'),
        numRows = 7,
        numCols = 5;

    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = [
            'images/water-block.png',   // Top row is water
            'images/grass-block.png',   // Row 1 of 1 of grass
            'images/stone-block.png',   // Row 1 of 3 of stone
            'images/stone-block.png',   // Row 2 of 3 of stone
            'images/stone-block.png',   // Row 3 of 3 of stone
            'images/grass-block.png',   // Row 1 of 2 of grass
            'images/grass-block.png'    // Row 2 of 2 of grass
        ];

    this.init = function() {
        // Load all the resources our game needs
        Resources.load([
            'images/stone-block.png',
            'images/water-block.png',
            'images/grass-block.png',
            'images/enemy-bug.png',
            'images/char-boy.png',
            'images/Heart.png'
        ]);
        // Everything is initialized, we can start the game
        Resources.onReady(function(){
            self.ready = true;
        });
    }

    this.render = function() {
        console.log("here!");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
        renderGrid();
    }

    var renderGrid = function(){

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (var row = 0; row < numRows; row++) {
            for (var col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
    }
}