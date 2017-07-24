// When the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  startStop = document.getElementById("startStop");
  startStop.innerHTML = "STOP";

  startStop.addEventListener("click", function() {
    if (startStop.innerHTML == "STOP") {
      chrome.runtime.sendMessage("stop animation");
      document.getElementById("startStop").style.backgroundColor = "green";
      startStop.innerText = "START";
    }
    else if (startStop.innerHTML == "START") {
      chrome.runtime.sendMessage("start animation");
      startStop.style.backgroundColor = "red";
      startStop.innerHTML = "STOP";
    }
  });
});