function changeColors(c) {
  var colors = ["red","orange","yellow", "green", "blue", "purple"];
  var i = 0;

  (function animate() {
    changeBackground(c, colors[i]);
    i += 1;
    i %= colors.length;

    updateIcon(c);
    setTimeout(animate, 200);
  })();
}