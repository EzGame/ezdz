function fullScreen(element) {
  var requestMethod = element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullscreen;

  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}