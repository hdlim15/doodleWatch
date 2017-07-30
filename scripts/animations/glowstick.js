function glowstick(c) {
    /**
     * glowstick like animation
     */
    function updateCanvas() {
        setBackground(c, cfg.background);
        c.strokeStyle = cfg.strokeColor;

        // Draw numArcs evenly spaced arcs
        var offset = 2*PI / cfg.numArcs;
        for (var i = 0; i < cfg.arcWidth; i++) {
            for (var j = 0; j < cfg.numArcs; j++) {
                drawArc(c, 9, 9, radius+i, start + j*offset, cfg.arcLength);
            }
        }
    }

    function updateVariables() {
        // Increase the start radians
        start += cfg.arcLength/3;
        start %= PI*2;

        // Increase and decrease the radius. Change color when radius is 0
        radius += d_radius;
        if (radius == 8) {
            d_radius = -1;
        }
        else if (radius == 0) {
            d_radius = 1;
        }
    }

    // Get user input
    chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
        var messageInfo = response.split("_");
        if (messageInfo[0] == "glowstick") {
            switch(messageInfo[1]) {
                case "color":
                    cfg.strokeColor = messageInfo[2];
                    break;
                case "background":
                    cfg.background = messageInfo[2];
                    break;
                case "numArcs":
                    cfg.numArcs = parseInt(messageInfo[2]);
                    var maxWidth = 2*PI / cfg.numArcs;
                    maxWidth = (Math.ceil(maxWidth*100) / 100).toFixed(2);
                    chrome.runtime.sendMessage("max arcLength_" + maxWidth.toString());
                    break;
                case "arcLength":
                    cfg.arcLength = parseFloat(messageInfo[2]);
                    break;
                case "speed":
                    cfg.timeout = 225 - parseInt(messageInfo[2]);
                    break;
                default:
                    console.log("invalid glowstick message");
            }
        }
    });
    
    var d_radius = 1;
    var radius = 5;
    var start = 0;

    // Variables that the user can change
    var cfg = {
        "numArcs": 3,
        "arcLength": PI / 3,
        "arcWidth": 2,
        "timeout": 75,

        "background": "black",
        "strokeColor": "white"
    };


    // Call animate immediately
    (function animate() {
        // Initialize in case started on pause
        updateCanvas();
        updateIcon(c);

        if (!isPaused) {
            updateCanvas();
            updateIcon(c);
            updateVariables();
        }

        timeoutID = window.setTimeout(animate, cfg.timeout);
    })();
}
