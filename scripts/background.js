// Global variables and constants
var pixels = 19;
var PI = Math.PI;

// var currentAnimation = ""
var isPaused = false
var timeoutID;

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
    // bingalee(c);
    // snek(c);

    chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
      if (response == "glowstick") {
        window.clearTimeout(timeoutID);
        glowstick(c);
      }
      else if (response == "bingalee") {
        window.clearTimeout(timeoutID);
        bingalee(c);
      }
    });
}

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  if (response == "opened") {
    chrome.runtime.sendMessage(isPaused);
    // alert(isPaused);
  }
  else if (response == "stop animation") {
    isPaused = true;
  }
  else if (response == "start animation") {
    isPaused = false;
  }
});
