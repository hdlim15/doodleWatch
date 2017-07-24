function updateIcon(c) {
  chrome.browserAction.setIcon({
    imageData: c.getImageData(0, 0, pixels, pixels)
  });
}