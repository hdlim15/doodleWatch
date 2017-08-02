function updateIcon() {
    /**
     * Sets the extension icon to be the canvas.
     * @param c: The 2D context of a canvas.
     */
    chrome.browserAction.setIcon({
        imageData: c.getImageData(0, 0, pixels, pixels)
    });
}

function randomColor() {
    /**
     * Returns a random color.
     * @returns string: A random color.
     */
    var hex_letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        // color += hex_letters[Math.floor(Math.random() * 8) + 8];
        color += hex_letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function setBackground(c, color) {
    /**
     * Sets the background of the canvas to a color.
     * @param c: The 2D context of a canvas.
     * @param color: The desired color of the background.
     */
    c.clearRect(0, 0, pixels, pixels);
    c.fillStyle = color;
    c.fillRect(0, 0, pixels, pixels);
}

function drawArc(c, x, y, radius, start, arcLength) {
    /**
     * Draws an arc on the canvas.
     * @param c: The 2D context of a canvas.
     * @param x: x center.
     * @param y: y center.
     * @param radius: radius.
     * @param start: start position in radians.
     * @param arcLength: arc length in radians.
     */
    c.beginPath();
    c.arc(x, y, radius, start, start + arcLength);
    c.stroke();
}

function drawBorder(color) {
    c.strokeStyle = color;
    c.strokeRect(0, 0, 19, 19);
}
