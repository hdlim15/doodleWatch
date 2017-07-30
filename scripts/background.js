// Global variables and constants
var PI = Math.PI;
var pixels = 19;

var isPaused = false
var timeoutID;

// Call init function
init();

function init() {
    /**
     * Initializes the canvas and its context
     * @returns context: The canvas's context
     */
    var forEach = Array.prototype.forEach;

    var canvas = document.createElement("canvas"); // Create the canvas
    canvas.width = pixels;
    canvas.height = pixels;
    var c = canvas.getContext("2d");

    var currentAnimation = "glowstick";
    glowstick(c);

    chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
        var messageInfo = response.split("_");
        // CA_ signifies a Change Animation message
        if (messageInfo[0] == "CA") {
            // only start animation if it is a different one
            var newAnimation = messageInfo[1];
            if (newAnimation != currentAnimation) {
                currentAnimation = newAnimation;
                // Stop the previous animation
                window.clearTimeout(timeoutID);
                // Start the next animation
                var animationFunction = window[newAnimation];
                animationFunction(c);
            }
        }
    });
}

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (response == "popup loaded") {
        chrome.runtime.sendMessage("isPaused " + isPaused);
    }
    else if (response == "stop animation") {
        isPaused = true;
    }
    else if (response == "start animation") {
        isPaused = false;
    }
});
