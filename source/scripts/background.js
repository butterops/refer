import 'emoji-log';
import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(() => {
  console.emoji('🦄 - ', 'Extension Installed....');
});

browser.runtime.onMessage.addListener((_request, _sender, _sendResponse) => {
  
  // sent from content script on each capture
  if ((_request.from === 'content') && (_request.subject === 'capturedReference')) {
    // console.emoji(`🦄 - Background received a ${_request.subject} sent from ${_request.from}.`, _request.data);
    browser.storage.local.set({ "capturedReference": _request.data });
    
    return Promise.resolve('your capture was saved');
  }
  
});