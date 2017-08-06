//debugging purposes
console = chrome.extension.getBackgroundPage().console;
var cfg_dictionary = {};


// When the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    var forEach = Array.prototype.forEach;
    var animations = document.getElementsByClassName("animation");

    var startStop = document.getElementById("startStop");
    // When popup is loaded, send a message. background will repond with isPaused
    (function notifyPopupLoaded() {
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

    // Start and stop the animation when the button is pressed
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


    // to access variables and functions from the background script
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        // configuration dictionary that stores cfg of each animation
        forEach.call(animations, function(animation) {
            // for each animation, create a canvas context and scale it
            var canvas = animation.getElementsByTagName("canvas")[0];
            var context = canvas.getContext("2d");
            context.scale(4, 4);

            // create a new animation object and begin the animation
            var animationName = animation.id;
            var configurableAnimation = new backgroundPage[animationName](context);
            configurableAnimation.initialize();
            configurableAnimation.animate();

            // save the cfg in cfg_dictionary
            cfg_dictionary[animationName] = configurableAnimation.cfg;
        });

        /******************** SAVE CONFIGURATION PARAMETERS ********************/
        function addAnimationToFavorites(animationType, cfg, isNew, storageID) {
            // Create new canvas with scaled context, append to document
            var newCanvas = document.createElement("canvas");
            var context = newCanvas.getContext("2d");
            newCanvas.height = 76;
            newCanvas.width = 76;

            if (isNew) {
                chrome.storage.sync.get("animationID", function(items) {
                    var id = items["animationID"];
                    if (typeof id == "undefined") {
                        id = 0;
                    }
                    newCanvas.id = id;
                    chrome.storage.sync.set({animationID: id + 1});

                    storeFavorite(animationType, cfg, id);
                });
            }
            else {
                newCanvas.id = storageID;
            }
            context.scale(4, 4);
            document.getElementById("favorites").appendChild(newCanvas);

            // Create new animation and animate it
            var newFavoriteAnimation = new backgroundPage[animationType](context, cfg);
            newFavoriteAnimation.initialize();
            newFavoriteAnimation.animate();
            newCanvas.addEventListener("click", function() {
                chrome.runtime.sendMessage({
                    type: "update icon",
                    animation: animationType,
                    cfg: cfg
                });
            });
            newCanvas.addEventListener("contextmenu", function(e) {
                e.preventDefault();
                deleteAnimationFromFavorites(this);
            });
        } // End of addAnimationToFavorites()

        function deleteAnimationFromFavorites(animation) {
            chrome.storage.sync.get("allFavorites", function(items) {
                var favoriteList = items["allFavorites"]
                for (var i = 0; i < favoriteList.length; i++) {
                    if (favoriteList[i].ID == animation.id) {
                        favoriteList.splice(i, 1);
                        chrome.storage.sync.set({allFavorites: favoriteList});
                        break;
                    }
                }
            });

            animation.remove();
        }

        function storeFavorite(animationType, cfg, animationID) {
            var newFavoriteObject = {
                ID: animationID,
                animation: animationType,
                cfg: cfg
            };
            chrome.storage.sync.get("allFavorites", function(items) {
                var favoriteList = items["allFavorites"];
                if (typeof favoriteList == "undefined") {
                    favoriteList = [];
                }
                favoriteList.push(newFavoriteObject);
                chrome.storage.sync.set({allFavorites: favoriteList});
            });
        } // End of storeFavorite()


        (function loadFavorites() {
            chrome.storage.sync.get("allFavorites", function(items) {
                forEach.call(items["allFavorites"], function(favorite) {
                    addAnimationToFavorites(favorite.animation, favorite.cfg, false, favorite.ID);
                });
            });
        })();

        // When each save configuration button is clicked...
        var saveConfigurationButtons = document.getElementsByClassName("saveConfigurations");
        forEach.call(saveConfigurationButtons, function(button) {
            button.addEventListener("click", function() {
                var animationType = this.getAttribute("data-animation");
                var cfgCopy = cloneObject(cfg_dictionary[animationType]);

                // Add the configured animation to the Favorites div
                addAnimationToFavorites(animationType, cfgCopy, true);
            });
        });

    }); // END OF GET BACKGROUND PAGE

    var parameters = document.getElementsByClassName("parameter");
    forEach.call(parameters, function(parameter) {
        parameter.addEventListener("click", function() {
            var thisAnimation = this.getAttribute("data-animation");
            var thisParameter = this.getAttribute("data-parameter");
            cfg_dictionary[thisAnimation][thisParameter] = this.value;
        });
    });
});

/* When a jscolor is selected, send a message with its id and the color */
function getInputColor(inputColor) {
    var thisAnimation = inputColor.getAttribute("data-animation");
    var thisParameter = inputColor.getAttribute("data-parameter");
    cfg_dictionary[thisAnimation][thisParameter] = inputColor.style.backgroundColor;
}

// chrome.storage.sync.clear();
