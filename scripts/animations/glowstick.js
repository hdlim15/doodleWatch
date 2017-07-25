function glowstick(c) {
    /**
     * glowstick like animation
     */
    function updateCanvas() {
        setBackground(c, background);

        // Draw 4 arcs evenly spaced
        drawArc(c, 9, 9, radius, start, arcLength);
        drawArc(c, 9, 9, radius, start + PI/2, arcLength);
        drawArc(c, 9, 9, radius, start + PI, arcLength);
        drawArc(c, 9, 9, radius, start + PI*1.5, arcLength);
    }

    function updateVariables() {
        // Increase the start radians
        start += PI / 8;
        start %= PI * 2;

        // Increase and decrease the radius. Change color when radius is 0
        radius += d_radius;
        if (radius == 8) {
            d_radius = -1;
        }
        else if (radius == 0) {
            d_radius = 1;
            c.strokeStyle = randomColor();
            background = randomColor(); 
        }
    }

    var arcLength = PI / 4;
    var start = 0;
    var radius = 5;
    var d_radius = 1;
    c.strokeStyle = "white";
    background = "black";

    // Call animate immediately
    (function animate() {
        // Initialize in case started on pause
        updateCanvas();
        updateIcon(c);

        if (!isPaused) {
            updateCanvas();
            updateIcon(c);
            updateVariables();
        }

        timeoutID = window.setTimeout(animate, 100);
    })();
}
