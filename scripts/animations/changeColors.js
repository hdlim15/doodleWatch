var changeColors = {
    colors: ["red","orange","yellow", "green", "blue", "purple"],
    index: 0,

    initialize: function initialize() {
        setBackground(c, this.colors[this.index]);
        updateIcon();
    },

    animate: function animate() {
        var that = this;
        if (!isPaused) {
            setBackground(c, that.colors[that.index]);
            updateIcon();
            that.index += 1;
            that.index %= that.colors.length;
        }
        timeoutID = window.setTimeout(function(){that.animate();}, 200);
    }
}