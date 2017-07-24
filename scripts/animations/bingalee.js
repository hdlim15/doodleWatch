function bingalee(c) {
    /**
     * scrolls text right to left
     */
    function updateCanvas() {
        setBackground(c, backgroundColor);
        c.strokeStyle = borderColor;
        c.strokeRect(0, 0, 19, 19);
        c.save();
        c.translate(step, pixels / 2);
        c.fillStyle = myTextColor;
        c.fillText(myText, 0, 0);
        c.restore();
    }

    function updateVariables() {
        if (step == 0)
            step = steps;
        step--;
    }
    
    c.textAlign = "right";
    c.textBaseline = "middle";

    myText = "B I N G A L E E       D I N G A L E E";
    myTextColor = "red";
    backgroundColor = "#FFF8DC";
    borderColor = "black";

    steps = 180;
    step = steps;

    updateCanvas();
    updateIcon(c);

    (function animate() {
        if (!isPaused) {
            updateCanvas();
            updateIcon(c);
            updateVariables();
        }
        timeoutID = window.setTimeout(animate, 35);
    })();
}
