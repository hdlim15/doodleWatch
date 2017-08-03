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
    c.id = "iconContext";

    // bingalee.initialize();
    // bingalee.animate();
    // glowstick.animate(c);
    var huh = new ChangeColors(c, {colors:["red", "blue"]});
    huh.initialize();
    huh.animate();


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
    else if (message.type == "change animation") {
        changeAnimation(message);
    }
    else if (message.type == "change parameter") {
        changeParameter(message);
    }
    else if (message.type == "save configuration") {
        saveConfiguration(message);
    }
});

function changeAnimation(message) {
        // Stop the previous animation
        window.clearTimeout(timeoutID);
        // Start the next animation
        newAnimation = new window[message.newAnimation](c, {colors:["red", "blue"]});
        newAnimation.initialize();
        newAnimation.animate();
}

function changeParameter(message) {
    cfg = window[message.animation].cfg;
    cfg[message.parameter] = message.value;
}

function saveConfiguration(message) {
    var newFavorite = {
        animation: message.animation,
        configuration: window[message.animation].cfg
    }
    chrome.storage.sync.set(
        newFavorite,
        function() {
            chrome.runtime.sendMessage(newFavorite);
        }
    )
}
}
