// Global variables and constants
var pixels = 19;
var PI = Math.PI;

// var currentAnimation = ""
var isPaused = false

// Call main function
main();


function main() {
  /**
   * Initializes the canvas and its context
   * @returns context: The canvas's context
   */
    var canvas = document.createElement("canvas"); // Create the canvas
    canvas.width = pixels;
    canvas.height = pixels;
    var c = canvas.getContext("2d");

    // changeColors(c);
    glowstick(c);
    // snek(c);
}

// Update isPaused based on the button pressed
chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  if (response == "stop animation") {
    isPaused = true;
  }
  else if (response == "start animation") {
    isPaused = false;
  }
});
