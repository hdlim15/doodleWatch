function cloneObject(oldObject) {
    /*
     * Returns a clone of an object
     */
    return JSON.parse(JSON.stringify(oldObject));
}

function toggleConfigDisplay(animation, clickLocation) {
    /*
     * Toggles the configuration display depending on where the mouse is clicked
     */
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


function deleteAnimationFromFavorites(animationCanvas) {
    // Remove from storage
    chrome.storage.sync.get("allFavorites", function(items) {
        var favoriteList = items["allFavorites"]
        for (var i = 0; i < favoriteList.length; i++) {
            if (favoriteList[i].ID == animationCanvas.id) {
                favoriteList.splice(i, 1);
                chrome.storage.sync.set({allFavorites: favoriteList});
                break;
            }
        }
    });
    // Remove canvas from DOM
    animationCanvas.remove();
}

function addDOMCanvasToFavorites(animationType, cfg, storageID) {
    var newCanvas = document.createElement("canvas");
    setDOMCanvasID(newCanvas, animationType, cfg, storageID);
    newCanvas.height = 76;
    newCanvas.width = 76;

    // append canvas to the DOM
    document.getElementById("favorites").appendChild(newCanvas);

    // add event listeners to add and delete from favorites
    newCanvas.addEventListener("click", function() {
        // send message to background, so icon updates even when popup is closed
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

    // Return the context of the canvas
    var context = newCanvas.getContext("2d");
    context.scale(4, 4);
    return context;
}

function setDOMCanvasID(newCanvas, animationType, cfg, storageID) {
    // if called from loadStoredFavorites
    if (typeof storageID != "undefined") {
        newCanvas.id = storageID;
    }
    // else a new animation is being added to the favorites
    else {
        chrome.storage.sync.get("animationID", function(items) {
            var id = items["animationID"];
            if (typeof id == "undefined") {
                id = 0;
            }
            newCanvas.id = id;
            chrome.storage.sync.set({animationID: id + 1});
            addFavoriteToStorage(animationType, cfg, id);
        });
    }
}

function addFavoriteToStorage(animationType, cfg, animationID) {
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
}