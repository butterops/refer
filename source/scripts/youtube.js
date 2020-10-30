// refer button ui
const addButton = function () {
  var b = document.createElement("button");
  b.setAttribute("onClick", "{alert('Captured !!');}");
  b.setAttribute("title", "Take Notes");
  b.setAttribute("class", "ytp-button ytp-settings-button");
  b.textContent = "Take Notes";
  document.getElementsByClassName("ytp-right-controls")[0].prepend(b);
  b.innerHTML =
    '<svg height="80%" version="1.1" viewBox="0 0 26 86" width="80%"><use class="ytp-svg-shadow"></use><path d="M46 14h8v48H18a8 8 0 0 1-8-8V8 M46 34l-7.9-6-8.1 6V10h16v24z M30 14H16a6 6 0 0 1 0-12h34" fill="transparent" stroke="#fff" stroke-width="5" id="ytp-id-16"></path></svg>';
};

export {
    addButton
};
