"use strict";
function glowstick(context, cfg) {
    /**
     * glowstick like animation
     */
    this.context = context;
    this.updateIcon = false;
    if (typeof cfg == "undefined") {
        this.cfg = {
            numArcs: 3,
            arcLength: PI / 3,
            arcWidth: 2,
            speed: 150,

            background: "black",
            strokeColor: "white"
        }
    }
    else {
        this.cfg = cfg;
    }
    this.d_radius= 1;
    this.radius= 5;
    this.start= 0;

    this.updateCanvas = function updateCanvas() {
        setBackground(this.context, this.cfg.background);
        this.context.strokeStyle = this.cfg.strokeColor;

        // Draw numArcs evenly spaced arcs
        var offset = 2*PI / this.cfg.numArcs;
        for (var i = 0; i < this.cfg.arcWidth; i++) {
            for (var j = 0; j < this.cfg.numArcs; j++) {
                drawArc(this.context, 9, 9, this.radius+i, this.start + j*offset, parseFloat(this.cfg.arcLength));
            }
        }
    };

    this.updateVariables = function updateVariables() {
        // Increase the start radians
        this.start += PI/8;
        this.start %= PI*2;

        // Increase and decrease the radius. Change color when radius is 0
        this.radius += this.d_radius;
        if (this.radius >= 8 || this.radius <= 0) {
            this.d_radius = -this.d_radius;
        }
    };

    this.initialize = function initialize() {
        this.updateCanvas();
        if (this.updateIcon) {
            updateIcon(this.context);
        }
    };

    // Call animate immediately
    this.animate = function animate() {
        this.updateCanvas();
        if (this.updateIcon) { 
            updateIcon(this.context);
        }   
        this.updateVariables();

        var that = this;
        this.timeoutID = window.setTimeout(function(){that.animate();}, 250-that.cfg.speed);
    };
}
