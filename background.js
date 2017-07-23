// Global variables and constants
var pixels = 19;
var PI = Math.PI;

// Call main function
main();


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

function updateIcon(c) {
  chrome.browserAction.setIcon({
    imageData: c.getImageData(0, 0, pixels, pixels)
  });
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

function main() {
  /**
   * Initializes the canvas and its context
   * @returns context: The canvas's context
   */
  var canvas = document.createElement("canvas"); // Create the canvas
  canvas.width = pixels;
  canvas.height = pixels;
  var c = canvas.getContext("2d");

  changeColors(c);
  // glowstick(c);
  // snek(c);
}

function changeColors(c) {
  var colors = ["red","orange","yellow", "green", "blue", "purple"];
  var i = 0;

  (function animate() {
    changeBackground(c, colors[i]);
    i += 1;
    i %= colors.length;

    updateIcon(c);
    setTimeout(animate, 200);
  })();
}

function snek(c) {
  /**
   * snek
   */
   console.log("snek");
}

function glowstick(c) {
  /**
   * glowstick like animation
   */
  var arcLength = PI / 4;
  var start = 0;
  var radius = 5;
  var d_radius = 1;
  c.strokeStyle = "white";
  background = "black";

  // Call animate immediately
  (function animate() {
    // Reset the background to black
    changeBackground(c, background);

    // Draw 4 arcs evenly spaced
    drawArc(c, 9, 9, radius, start, arcLength);
    drawArc(c, 9, 9, radius, start + PI/2, arcLength);
    drawArc(c, 9, 9, radius, start + PI, arcLength);
    drawArc(c, 9, 9, radius, start + PI*1.5, arcLength);

    // Change the actual icon to the new drawing
    updateIcon(c);

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

    // Call animate() every 100 ms
    window.setTimeout(animate, 100);
  })();
}
