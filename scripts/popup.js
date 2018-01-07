// configuration dictionary that stores cfg of each animation
var cfg_dictionary = {};

(function () {
//debugging purposes
console = chrome.extension.getBackgroundPage().console;

// When the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    var forEach = Array.prototype.forEach;

    //--------------------- Code for the Start/Stop button ---------------------
    var startStop = document.getElementById("startStop");

    // When popup is loaded, set the correct version of the button
    (function initializeStartStop() {
        chrome.runtime.sendMessage("popup loaded");
        chrome.runtime.onMessage.addListener(function(message) {
            if (message == "isPaused true") {
                startStop.style.backgroundColor = "green";
                startStop.innerHTML = "START";
            }
            else if (message == "isPaused false") {
                startStop.style.backgroundColor = "red";
                startStop.innerHTML = "STOP";
            }
        });
    })();

    // Start/stop the animation when the start/stop button is pressed
    startStop.addEventListener("click", function() {
        if (startStop.innerHTML == "STOP") {
            startStop.style.backgroundColor = "green";
            startStop.innerHTML = "START";
            chrome.runtime.sendMessage("stop animation");
        }
        else if (startStop.innerHTML == "START") {
            startStop.style.backgroundColor = "red";
            startStop.innerHTML = "STOP";
            chrome.runtime.sendMessage("start animation");
        }
    });
    //^^^^^^^^^^^^^^^^^ End of code for the Start/Stop button ^^^^^^^^^^^^^^^^^^


    // Open and close the configurations window
    var animations = document.getElementsByClassName("animation");
    window.addEventListener("click", function(e) {
        forEach.call(animations, function(animation) {
            toggleConfigDisplay(animation, e.target);
        });
    });

    // When a parameter value is changed, update the cfg dictionary
    var parameters = document.getElementsByClassName("parameter");
    forEach.call(parameters, function(parameter) {
        parameter.addEventListener("click", function() {
            var thisAnimation = this.getAttribute("data-animation");
            var thisParameter = this.getAttribute("data-parameter");
            cfg_dictionary[thisAnimation][thisParameter] = this.value;
        });
    });


    //------------------------- ACCESS BACKGROUND PAGE -------------------------
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        // When the popup is opened, load all available animations
        forEach.call(animations, function(animation) {
            // for each animation, create a canvas context and scale it
            var canvas = animation.getElementsByTagName("canvas")[0];
            var context = canvas.getContext("2d");
            context.scale(4, 4);

            // create a new animation object and begin the animation
            var animationName = animation.getAttribute("data-animation");
            var configurableAnimation = new backgroundPage[animationName](context);
            configurableAnimation.initialize();
            configurableAnimation.animate();

            // save the cfg in cfg_dictionary
            cfg_dictionary[animationName] = configurableAnimation.cfg;
        });

        // When the popup is opened, load all stored favorites
        (function loadStoredFavorites() {
            chrome.storage.sync.get("allFavorites", function(items) {
                forEach.call(items["allFavorites"], function(favorite) {
                    addAnimationToFavorites(favorite.animation, favorite.cfg, favorite.ID);
                });
            });
        })();

        // When each save configuration button is clicked...
        var saveCfgButtons = document.getElementsByClassName("saveCfg");
        forEach.call(saveCfgButtons, function(button) {
            button.addEventListener("click", function() {
                // Add the configured animation to the Favorites div
                var animationType = this.getAttribute("data-animation");
                var cfgCopy = cloneObject(cfg_dictionary[animationType]);
                addAnimationToFavorites(animationType, cfgCopy);
            });
        });

        // Add an animation to the favorites div and animate it
        function addAnimationToFavorites(animationType, cfg, storageID) {
            // Creates the DOM element, and saves the new favorite to storage
            var context = addDOMCanvasToFavorites(animationType, cfg, storageID);

            // Create new animation and animate it
            var newFavoriteAnimation = new backgroundPage[animationType](context, cfg);
            newFavoriteAnimation.initialize();
            newFavoriteAnimation.animate();
        }
    });
    //^^^^^^^^^^^^^^^^^^^^^^^ END OF GET BACKGROUND PAGE ^^^^^^^^^^^^^^^^^^^^^^^
});

// chrome.storage.sync.clear();


})();

/* When a jscolor is selected, send a message with its id and the color */
function getInputColor(inputColor) {
    var thisAnimation = inputColor.getAttribute("data-animation");
    var thisParameter = inputColor.getAttribute("data-parameter");
    cfg_dictionary[thisAnimation][thisParameter] = inputColor.style.backgroundColor;
}
