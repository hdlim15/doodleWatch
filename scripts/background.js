// Global variables and constants
var PI = Math.PI;
var pixels = 19;

// var currentAnimation = ""
var isPaused = false
var timeoutID;

// Call init function
init();

function init() {
    /**
     * Initializes the canvas and its context
     * @returns context: The canvas's context
     */
    var canvas = document.createElement("canvas"); // Create the canvas
    canvas.width = pixels;
    canvas.height = pixels;
    var c = canvas.getContext("2d");

    glowstick(c);

    chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
        // CA_ signifies a Change Animation message
        if (response.substring(0, 3) == "CA_") {
            // Stop the previous animation
            window.clearTimeout(timeoutID);
            // Start the next animation
            var animation = response.substring(3,);
            window[animation](c);
        }
    });
}

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (response == "opened") {
        chrome.runtime.sendMessage(isPaused);
    }
    else if (response == "stop animation") {
        isPaused = true;
    }
    else if (response == "start animation") {
        isPaused = false;
    }
});
