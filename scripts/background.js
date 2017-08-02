// Call init function
init();
function init() {
    /**
     * Initializes the canvas and its context
     * @returns context: The canvas's context
     */


    // bingalee.initialize();
    // bingalee.animate();
    glowstick.animate();
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
    else if (message.type == "change animation") {
        changeAnimation(message);
    }
    // else if (messageInfo[0] == "SAVE") {

    // }
    else if (message.type == "change parameter") {
        cfg = window[message.animation].cfg;
        cfg[message.parameter] = message.value;
        console.log(message.value+ 100);
    }
});

function changeAnimation(message) {
        // only start animation if it is a different one
        var newAnimation = message.newAnimation;
        // Stop the previous animation
        window.clearTimeout(timeoutID);
        // Start the next animation
        window[newAnimation].initialize();
        window[newAnimation].animate(c);
}