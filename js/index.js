let board;

DrawingBoard.Control.Lock = DrawingBoard.Control.extend({
    name: 'lock',
    initialize: function() {
	this.$el.append('<button class="drawing-board-control-download-button"></button>');
	this.$el.on('click', '.drawing-board-control-download-button', $.proxy(function(e) {
            const desc = window.webxdc.selfName + ' sent a draw';
            window.webxdc.sendUpdate({payload: this.board.getImg(), summary: desc}, desc);
	    e.preventDefault();
	}, this));
    }
});

setImg = (url) => {
    document.getElementById('board').innerHTML = '<img style="max-width:100%;height:auto" src="' + url +'">';
};

onload = () => {
    window.webxdc.setUpdateListener((update) => {
        setImg(update.payload);
    });
    window.webxdc.getAllUpdates().then((updates) => {
        if (updates[0]) {
            setImg(updates[0].payload);
        } else {
            board = new DrawingBoard.Board('board', {
                webStorage: false,
                errorMessage: 'Failed to load the editor',
            });
            board.addControl('Lock');
        }
    });
};

onresize = () => board.resize();
