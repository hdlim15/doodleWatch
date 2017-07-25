function changeColors(c) {
    var colors = ["red","orange","yellow", "green", "blue", "purple"];
    var i = 0;

    setBackground(c, colors[i]);
    updateIcon(c);

    (function animate() {
        if (!isPaused) {
            setBackground(c, colors[i]);
            updateIcon(c);
            i += 1;
            i %= colors.length;
        }
        timeoutID = setTimeout(animate, 200);
    })();
}