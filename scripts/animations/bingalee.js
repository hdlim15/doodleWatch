function bingalee(context, cfg) {
    /**
     * scrolls text right to left
     */
    this.context = context;
    this.updateIcon = false;
    if (typeof cfg == "undefined") {
            this.cfg = {
            text: "BINGALEE DINGALEE",
            textColor: "red",
            backgroundColor: "#FFF8DC"
        }
    }
    else {
        this.cfg = cfg;
    }
    this.steps = 9 * this.cfg.text.length + 9;
    this.step = this.steps;

    this.updateCanvas = function updateCanvas() {
        setBackground(this.context, this.cfg.backgroundColor);
        this.context.save();
        this.context.translate(this.step, pixels / 2);
        this.context.fillStyle = this.cfg.textColor;
        this.context.fillText(this.cfg.text, 0, 0);
        this.context.restore();
    };

    this.updateVariables = function updateVariables() {
        if (this.step == 0) {
            this.step = this.steps;
        }
        this.step -= 2;
    };

    this.initialize = function initialize() {
        this.context.textAlign = "right";
        this.context.textBaseline = "middle";
        this.updateCanvas();
        if (this.updateIcon) {
            updateIcon(this.context);
        }
    };

    this.animate = function animate() {
        this.updateCanvas(this.context);
        if (this.updateIcon) {
            updateIcon(this.context);
        }
        this.updateVariables();

        var that = this;
        this.timeoutID = window.setTimeout(function(){that.animate();}, 45);
    };
}
