import '../img/icon-128.png'
import '../img/icon-34.png'
// alert('hi')
// chrome.tabs.sendMessage(
//   { from: 'background', message: 'Information from webpage.' },
//   function(response) {
//       console.log(response);
//     }
// );
// chrome.runtime.sendMessage({ from: 'bg', message: 'Information from webpage.' });
console.log(chrome);
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //alert('updated from background');
    console.log(changeInfo.url);
    console.log(tabId);
    //chrome.runtime.sendMessage({ from: 'background', message: 'Information from webpage.' });
    if(changeInfo.url && changeInfo.url.includes('watch')){
      chrome.tabs.sendMessage(
        tabId, { from: 'background', message: 'Information from webpage.', changeInfo: changeInfo }
        // ,
        // function(response) {
        //     // console.log(response);
        //   }
      );
    }
});
