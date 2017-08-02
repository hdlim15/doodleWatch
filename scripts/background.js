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

    glowstick.animate(c);
}

chrome.runtime.onMessage.addListener(function (message) {
    if (message == "popup loaded") {
        chrome.runtime.sendMessage("isPaused " + isPaused);
    }
    else if (message == "stop animation") {
        isPaused = true;
    }
    else if (message == "start animation") {
        isPaused = false;
    }
    var messageInfo = message.split("_");
    // CA_ signifies a Change Animation message
    var currentAnimation = "glowstick";
    if (messageInfo[0] == "CA") {
        // only start animation if it is a different one
        var newAnimation = messageInfo[1];
        if (newAnimation != currentAnimation) {
            currentAnimation = newAnimation;
            // Stop the previous animation
            window.clearTimeout(timeoutID);
            // Start the next animation
            console.log(newAnimation);
            console.log(window[newAnimation]);
            var animationFunction = window[newAnimation].animate;
            animationFunction(c);
        }
    }
    else if (messageInfo[0] == "SAVE") {

    }
    else if (messageInfo[0] == "glowstick") {
        cfg = window[messageInfo[0]].cfg;
        switch(messageInfo[1]) {
            case "strokeColor":
                cfg[messageInfo[1]] = messageInfo[2];
                break;
            case "background":
                cfg.background = messageInfo[2];
                break;
            case "numArcs":
                cfg.numArcs = parseInt(messageInfo[2]);
                var maxWidth = 2*PI / cfg.numArcs;
                maxWidth = (Math.ceil(maxWidth*100) / 100).toFixed(2);
                console.log(maxWidth);
                break;
            case "arcLength":
                cfg.arcLength = parseFloat(messageInfo[2]);
                console.log(cfg.arcLength);
                break;
            case "speed":
                cfg.timeout = 225 - parseInt(messageInfo[2]);
                break;
            default:
                console.log("invalid glowstick message");
        }
    }
});
