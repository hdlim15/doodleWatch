var bingalee = {
    /**
     * scrolls text right to left
     */
    steps: 180,
    step: 180,

    cfg: {
        text: "B I N G A L E E       D I N G A L E E",
        textColor: "red",
        backgroundColor: "#FFF8DC"
    },

    updateCanvas: function updateCanvas(c) {
        setBackground(c, this.cfg.backgroundColor);
        c.save();
        c.translate(this.step, pixels / 2);
        c.fillStyle = this.cfg.textColor;
        c.fillText(this.cfg.text, 0, 0);
        c.restore();
    },

    updateVariables: function updateVariables() {
        if (this.step == 0) {
            this.step = this.steps;
        }
        this.step -= 2;
    },

    initialize: function initialize(c) {
        c.textAlign = "right";
        c.textBaseline = "middle";
        this.updateCanvas(c);
        updateIcon(c);
    },

    animate: function animate(c) {
        var that = this;

        if (!isPaused) {
            that.updateCanvas(c);
            updateIcon(c);
            that.updateVariables();
        }
        timeoutID = window.setTimeout(function(){that.animate(c);}, 45);
    }
}
