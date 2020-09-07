console.log("watching on youtube");
// ytplayer = document.getElementById("movie_player");
// ytplayer.getCurrentTime();
console.log(chrome);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
alert('message')
  if (request.from == 'background') {
    console.log('The request has been received from the bg script.');
  }
});
