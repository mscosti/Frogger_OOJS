function ViewManager(gameManager, global){
    // reference back to itself for callback access to this
    var self = this;

    var doc = global.document;
    var win = global.window;

    var gameManager = gameManager,
        canvas = $('#game')[0],
        overlay = $('#overlay')[0],
        ctx = canvas.getContext('2d'),
        overlayCtx = overlay.getContext('2d'),
        renderables = [],
        numRows = 7,
        numCols = 5;

    global.ctx = ctx;
    global.overlayCtx = overlayCtx;
    /* This array holds the relative URL to the image used
     * for that particular row of the game grid.
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
        canvas.width = 505;
        canvas.height = 707;
        overlay.width = 1000;
        overlay.height = 707;

        // Load all the resources our game needs
        Resources.load([
            'images/stone-block.png',
            'images/water-block.png',
            'images/grass-block.png',
            'images/enemy-bug.png',
            'images/char-boy.png',
            'images/Heart.png'
        ]);

        var self = this;
        Resources.onReady(function(){
            // Everything is initialized, flag we are ready
            self.loaded = true;
        });
    };

    this.addRenderables = function(renderable) {
        if (renderable instanceof Array){
            renderable.forEach(function(renderable){
                renderables.push(renderable);
            });
        }
        else{
            renderables.push(renderable);
        }
    }

    this.render = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
        this.renderGrid();
        this.renderRenderables();
    };

    this.renderGrid = function(){

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (var row = 0; row < numRows; row++) {
            for (var col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
    };

    this.renderRenderables = function() {
        renderables.forEach(function(renderable){
            renderable.render(ctx,overlayCtx);
        });
    }
}