//debugging purposes
console = chrome.extension.getBackgroundPage().console;

// When the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    var forEach = Array.prototype.forEach;
    var animations = document.getElementsByClassName("animation");

    var startStop = document.getElementById("startStop");
    function stopAnimation() {
        chrome.runtime.sendMessage("stop animation");
        startStop.style.backgroundColor = "green";
        startStop.innerHTML = "START";
    }
    function startAnimation() {
        chrome.runtime.sendMessage("start animation");
        startStop.style.backgroundColor = "red";
        startStop.innerHTML = "STOP";
    }

    // When popup is loaded, send a message. background will repond with isPaused
    (function notifyPopupLoaded() {
        chrome.runtime.sendMessage("popup loaded");

        chrome.runtime.onMessage.addListener(function(message) {
            if (message == "isPaused true") {
                stopAnimation();
            }
            else if (message == "isPaused false") {
                startAnimation();
            }
        });
    })();

    // Start and stop the animation when the button is pressed
    startStop.addEventListener("click", function() {
        if (startStop.innerHTML == "STOP") {
            stopAnimation();
        }
        else if (startStop.innerHTML == "START") {
            startAnimation();
        }
    });

    // Open and close the configurations window 
    window.addEventListener("click", function(e) {
        function toggleConfigDisplay(animation, clickLocation) {
            var configurations = animation.getElementsByClassName("configurations")[0];
            var colorMenu = document.getElementById("jscolorWindow");

            if (animation.contains(clickLocation)) {
                if (configurations.style.display == "block") {
                    if (!configurations.contains(clickLocation)) {
                        configurations.style.display = "none";
                    }
                }
                else {
                    configurations.style.display = "block";
                }
            }
            else {
                if (colorMenu && colorMenu.contains(clickLocation)) {}
                else {
                    configurations.style.display = "none";
                }
            }
        }

        forEach.call(animations, function(animation) {
            toggleConfigDisplay(animation, e.target);
        });
    });

    /************************** CHANGE ANIMATIONS **************************/
    forEach.call(animations, function(animation) {
        animation.addEventListener("click", function() {
            chrome.runtime.sendMessage({
                "type": "change animation",
                "newAnimation": this.id
            });
        });
    });

    /******************* CHANGE CONFIGURATION PARAMETERS *******************/
    var parameters = document.getElementsByClassName("parameter");
    forEach.call(parameters, function(parameter) {
        parameter.addEventListener("input", function() {
            chrome.runtime.sendMessage({
                "type": "change parameter",
                "animation": this.getAttribute("data-animation"),
                "parameter": this.getAttribute("data-parameter"),
                "value": this.value
            });
        });
    });

    /******************** SAVE CONFIGURATION PARAMETERS ********************/
    var saveConfigurations = document.getElementsByClassName("saveConfigurations");
    forEach.call(saveConfigurations, function(button) {
        button.addEventListener("click", function() {
            console.log(this.parentElement.id);
            console.log(this.parentElement.parentElement.id);
            chrome.runtime.sendMessage({
                "type": "save configuration",
                "SAVE": this.parentElement.id
            });
        });
    });
});

// to access variables and functions from the background script
chrome.runtime.getBackgroundPage(function (backgroundPage) { 
    // console.log(backgroundPage);
    // document.getElementById("glowstick_arcLength").max = backgroundPage.maxWidth;
});

/* When a jscolor is selected, send a message with its id and the color */
function getInputColor(inputColor) {
    console.log("f");
    chrome.runtime.sendMessage({
        "type": "change parameter",
        "animation": inputColor.getAttribute("data-animation"),
        "parameter": inputColor.getAttribute("data-parameter"),
        "value": inputColor.style.backgroundColor
    });
}
