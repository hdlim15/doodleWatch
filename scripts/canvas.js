function randomColor() {
  /**
   * @summary: Returns a random color.
   *
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

function changeBackground(c, color) {
  c.clearRect(0, 0, pixels, pixels);
  c.fillStyle = color;
  c.fillRect(0, 0, pixels, pixels)
}

function drawArc(c, x, y, radius, start, arcLength) {
  /**
   * @summary: Draws an arc.
   *
   * @param c: The canvas context.
   * @param x: x center.
   * @param y: y center.
   * @param radius: radius.
   * @param start: start position in radians.
   * @param arcLength: arcLength in radians.
   */
  c.beginPath();
  c.arc(x, y, radius, start, start + arcLength);
  c.arc(x, y, radius + 1, start, start + arcLength);
  c.stroke();
}
