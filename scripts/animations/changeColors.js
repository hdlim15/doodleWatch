// var changeColors = {
//     colors: ["red","orange","yellow", "green", "blue", "purple"],
//     index: 0,

//     initialize: function initialize(c) {
//         setBackground(c, this.colors[this.index]);
//         updateIcon(c);
//     },

//     animate: function animate(c) {
//         var that = this;
//         if (!isPaused) {
//             setBackground(c, that.colors[that.index]);
//             updateIcon(c);
//             that.index += 1;
//             that.index %= that.colors.length;
//         }
//         timeoutID = window.setTimeout(function(){that.animate(c);}, 200);
//     }
// }

function ChangeColors(context, cfg) {
    this.context = context;
    this.isIcon = (context.id == "iconContext");
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
        if (this.isIcon) {
            updateIcon(this.context);
        }
    };

    this.animate = function animate() {
        if (!isPaused || !this.isIcon) {
            setBackground(this.context, this.cfg.colors[this.index]);
            if (this.isIcon) {
                updateIcon(this.context);
            }
            this.index += 1;
            this.index %= this.cfg.colors.length;
        }
        var that = this;
        timeoutID = window.setTimeout(function(){that.animate(this.context);}, 200);       
    }
}