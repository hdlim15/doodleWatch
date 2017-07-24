// When the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    (function notifyPopupLoaded() {
        chrome.runtime.sendMessage("opened");
    })();

    document.getElementById("glowstick").addEventListener("click", function() {
        chrome.runtime.sendMessage("CA_glowstick");
    });
    document.getElementById("bingalee").addEventListener("click", function() {
        chrome.runtime.sendMessage("CA_bingalee");
    });
    document.getElementById("changeColors").addEventListener("click", function() {
        chrome.runtime.sendMessage("CA_changeColors");
    });

    startStop = document.getElementById("startStop");
    startStop.addEventListener("click", function() {
        if (startStop.innerHTML == "STOP") {
            chrome.runtime.sendMessage("stop animation");
            document.getElementById("startStop").style.backgroundColor = "green";
            startStop.innerHTML = "START";
        }
        else if (startStop.innerHTML == "START") {
            chrome.runtime.sendMessage("start animation");
            startStop.style.backgroundColor = "red";
            startStop.innerHTML = "STOP";
        }
    });

    chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
        if (response == true) {
            document.getElementById("startStop").style.backgroundColor = "green";
            startStop.innerHTML = "START";
        }
        else if (response == false) {
            document.getElementById("startStop").style.backgroundColor = "red";
            startStop.innerHTML = "STOP";
        }
    });

        

    
});