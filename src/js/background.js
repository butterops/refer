import '../img/icon-128.png'
import '../img/icon-34.png'
// alert('hi')
chrome.runtime.sendMessage(
  { from: 'background', message: 'Information from webpage.' },
  function(response) {
      console.log(response);
    }
);
// chrome.runtime.sendMessage({ from: 'bg', message: 'Information from webpage.' });
console.log(chrome);
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //alert('updated from background');
    console.log('check');
    chrome.runtime.sendMessage({ from: 'background', message: 'Information from webpage.' });
});
