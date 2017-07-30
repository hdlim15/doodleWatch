// When the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    startStop = startStop;

    // When popup is loaded, send a message. background will repond with isPaused
    (function notifyPopupLoaded() {
        chrome.runtime.sendMessage("popup loaded");

        chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
            if (response == "isPaused true") {
                startStop.style.backgroundColor = "green";
                startStop.innerHTML = "START";
            }
            else if (response == "isPaused false") {
                startStop.style.backgroundColor = "red";
                startStop.innerHTML = "STOP";
            }
        });
    })();

    // 
    startStop.addEventListener("click", function() {
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
        if (startStop.innerHTML == "STOP") {
            stopAnimation();
        }
        else if (startStop.innerHTML == "START") {
            startAnimation();
        }
    });

    // 
    var animations = document.getElementsByClassName("animation");
    window.addEventListener("click", function(e) {  
        for (var i = 0; i < animations.length; i++) {
            var animation = animations[i];
            var configurations = animation.getElementsByClassName("configurations")[0];
            var colorMenu = document.getElementById("jscolorWindow");

            if (animation.contains(e.target)) {
                if (configurations.style.display == "block") {
                    if (!configurations.contains(e.target)) {
                        configurations.style.display = "none";
                    }
                }
                else {
                    configurations.style.display = "block";
                }
            }
            else {
                if (colorMenu && colorMenu.contains(e.target)) {
                }
                else {
                    configurations.style.display = "none";
                }
            }
        }
    });


    document.getElementById("glowstick_num").addEventListener("input", function() {
        chrome.runtime.sendMessage(this.id + "_" + this.value.toString());
    });
    document.getElementById("glowstick_length").addEventListener("input", function() {
        console.log(this.value);
        chrome.runtime.sendMessage(this.id + "_" + this.value.toString());
    });
    document.getElementById("glowstick_speed").addEventListener("input", function() {
        console.log(this.value);
        chrome.runtime.sendMessage(this.id + "_" + this.value.toString());
    });



    /**************** Event listeners that change animations ****************/
    document.getElementById("glowstick").addEventListener("click", function() {
        chrome.runtime.sendMessage("CA_glowstick");
    });
    document.getElementById("bingalee").addEventListener("click", function() {
        chrome.runtime.sendMessage("CA_bingalee");
    });
    document.getElementById("changeColors").addEventListener("click", function() {
        chrome.runtime.sendMessage("CA_changeColors");
    });
    /************************************************************************/


});

/* When a jscolor is selected, send a message with its id and the color */
function getInputColor(inputColor) {
    var id = inputColor.id;
    var color = inputColor.style.backgroundColor;
    chrome.runtime.sendMessage(id + "_" + color);
}
