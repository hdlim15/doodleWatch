"use strict";
var glowstick = {
    /**
     * glowstick like animation
     */
     d_radius: 1,
     radius: 5,
     start: 0,

    // Variables that the user can change
    cfg: {
        numArcs: 3,
        arcLength: PI / 3,
        arcWidth: 2,
        speed: 150,

        background: "black",
        strokeColor: "white"
    },

    updateCanvas: function updateCanvas() {
        setBackground(c, this.cfg.background);
        c.strokeStyle = this.cfg.strokeColor;

        // Draw numArcs evenly spaced arcs
        var offset = 2*PI / this.cfg.numArcs;
        for (var i = 0; i < this.cfg.arcWidth; i++) {
            for (var j = 0; j < this.cfg.numArcs; j++) {
                drawArc(c, 9, 9, this.radius+i, this.start + j*offset, parseFloat(this.cfg.arcLength));
            }
        }
    },

    updateVariables: function updateVariables() {
        // Increase the start radians
        this.start += PI/8;
        this.start %= PI*2;

        // Increase and decrease the radius. Change color when radius is 0
        this.radius += this.d_radius;
        if (this.radius >= 8 || this.radius <= 0) {
            this.d_radius = -this.d_radius;
        }
    },

    initialize: function initialize() {
        this.updateCanvas();
        updateIcon();
    },

    // Call animate immediately
    animate: function animate() {
        var that = this;

        if (!isPaused) {
            that.updateCanvas();
            updateIcon();
            that.updateVariables();
        }
        timeoutID = window.setTimeout(function(){that.animate();}, 250-that.cfg.speed);
    }
}
