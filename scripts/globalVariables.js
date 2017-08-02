// Global variables and constants
var PI = Math.PI,
isPaused = false,
timeoutID = 0,
pixels = 19,
forEach = Array.prototype.forEach;

function initializeContext() {
    var canvas = document.createElement("canvas"); // Create the canvas
    canvas.width = pixels;
    canvas.height = pixels;

    return canvas.getContext("2d");
}

var c = initializeContext();