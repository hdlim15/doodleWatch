function ChangeColors(context, cfg) {
    this.context = context;
    this.updateIcon = false;
    if (typeof cfg == "undefined") {
        this.cfg = {
            numColors: 3,
            c1: "orange",
            c2: "yellow",
            c3: "green",
            c4: "blue"
        }
    }
    else {
        this.cfg = cfg;
    }
    this.index = 0;
    this.colorArr = [this.cfg.c1,this.cfg.c2,this.cfg.c3,this.cfg.c4];

    this.initialize = function initialize() {
        setBackground(this.context, this.colorArr[this.index]);
        if (this.updateIcon) {
            updateIcon(this.context);
        }
    };

    this.animate = function animate() {
        setBackground(this.context, this.colorArr[this.index]);
        if (this.updateIcon) {
            updateIcon(this.context);
        }
        this.colorArr = [this.cfg.c1,this.cfg.c2,this.cfg.c3,this.cfg.c4];
        this.index += 1;
        this.index %= this.cfg.numColors;

        var that = this;
        this.timeoutID = window.setTimeout(function(){that.animate();}, 200);
    }
}
