function ChangeColors(context, cfg) {
    this.context = context;
    this.updateIcon = false;
    if (typeof cfg == "undefined") {
        this.cfg = {
            colors: ["purple", "orange"]
        }
    }
    else {
        this.cfg = cfg;
    }
    this.index = 0;

    this.initialize = function initialize() {
        setBackground(this.context, this.cfg.colors[this.index]);
        if (this.updateIcon) {
            updateIcon(this.context);
        }
    };

    this.animate = function animate() {
        setBackground(this.context, this.cfg.colors[this.index]);
        if (this.updateIcon) {
            updateIcon(this.context);
        }
        this.index += 1;
        this.index %= this.cfg.colors.length;

        var that = this;
        this.timeoutID = window.setTimeout(function(){that.animate();}, 200);       
    }
}
