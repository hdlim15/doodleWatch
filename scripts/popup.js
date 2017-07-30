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

        chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
            if (response == "isPaused true") {
                stopAnimation();
            }
            else if (response == "isPaused false") {
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
            chrome.runtime.sendMessage("CA_" + this.id);
        });
    });

    /******************** CHANGE CONFIGURATION PARAMTER ********************/
    var parameters = document.getElementsByClassName("parameter");
    forEach.call(parameters, function(parameter) {
        parameter.addEventListener("input", function() {
            chrome.runtime.sendMessage(this.id + "_" + this.value.toString());
        });
    });

    chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
        var info = response.split("_");
        if (info[0] == "max arcLength") {
            document.getElementById("glowstick_arcLength").max = parseFloat(info[1]);
        }
    });

});

/* When a jscolor is selected, send a message with its id and the color */
function getInputColor(inputColor) {
    var id = inputColor.id;
    var color = inputColor.style.backgroundColor;
    chrome.runtime.sendMessage(id + "_" + color);
}
