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
    var context = canvas.getContext("2d");
        
    var currentIconAnimation = new bingalee(context);
    currentIconAnimation.updateIcon = true;
    currentIconAnimation.initialize();
    currentIconAnimation.animate();
    var isPaused = false;

    chrome.runtime.onMessage.addListener(function (message) {
        if (message == "popup loaded") {
            chrome.runtime.sendMessage("isPaused " + isPaused);
        }
        else if (message == "stop animation") {
            isPaused = true;
            window.clearTimeout(currentIconAnimation.timeoutID);
        }
        else if (message == "start animation") {
            isPaused = false;
            currentIconAnimation.initialize();
            currentIconAnimation.animate();
        }
        else if (message.type == "update icon") {
            updateIcon(message);
        }
    });

    function updateIcon(message) {
        if (typeof currentIconAnimation != "undefined") {
            window.clearTimeout(currentIconAnimation.timeoutID);
        }

        var iconAnimation = new window[message.animation](context, message.cfg); 
        iconAnimation.updateIcon = true;
        iconAnimation.initialize();
        if (!isPaused) {
            iconAnimation.animate();
        }

        currentIconAnimation = iconAnimation;
    }

}
