console.log("watching on youtube");
// ytplayer = document.getElementById("movie_player");
// ytplayer.getCurrentTime();
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  if (request.from == 'background') {
    console.log(request.changeInfo);
    console.log('one step away from an awsome plugin and once we carve it you will be able to take notes from this URL>>>>>> '+ request.changeInfo.url);
  }
});
