import 'emoji-log';
import browser from 'webextension-polyfill';

import '../styles/popup.scss';

function openWebPage(url) {
  return browser.tabs.create({ url });
}

var read = (name, deflt) => browser.storage.local.get([name])
  .then(result => {
    if (browser.runtime.lastError) { // assuming this exists
      throw new Error(browser.runtime.lastError);
    }
    return result[name] || deflt;
  });


document.addEventListener('DOMContentLoaded', async () => {

  read('capturedReference', null)
    .then((result) => {

      //json
      // console.log(JSON.stringify(result))

      //screenshot
      $('#screenshot').attr('src', result.info[3].value)

      //all fields
      var tbl = document.createElement('table');
      tbl.style['text-align'] = 'left';
      tbl.setAttribute('border', '1');
      var tbl_body = document.createElement("tbody");
      tbl.appendChild(tbl_body);
      var odd_even = false;
      var thead = document.createElement('thead');
      tbl.appendChild(thead);
      thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Captured Items"));
      thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Values"));
      var keyPrefix = ''
      var lastKeyPrefix = ''

      function process(key, value) {
        // if (typeof value === 'object' && value !== null) {
        //   keyPrefix = keyPrefix.replace(lastKeyPrefix,'')
        //   keyPrefix += `${key}/`;
        //   lastKeyPrefix = `${key}/`
        // } else {
          var tbl_row = tbl_body.insertRow();
          tbl_row.className = odd_even ? "odd" : "even";

          var cell1 = tbl_row.insertCell();
          cell1.appendChild(document.createTextNode(keyPrefix + key.toString()));

          var cell2 = tbl_row.insertCell();
          cell2.appendChild(document.createTextNode(value.toString()));
          odd_even = !odd_even;
        // }
      }

      function traverse(o, func) {
        for (var i in o) {
          func.apply(this, [i, o[i]]);
          if (o[i] !== null && typeof (o[i]) == "object") {
            //going one step down in the object tree!!
            traverse(o[i], func);
          }
        }
      }

      //that's all... no magic, no bloated framework
      traverse(result, process);

      $("#all-fields").html(tbl);   //DOM table doesn't have .appendChild

    })
    .catch(console.error)



  // const tabs = await browser.tabs.query({
  //   active: true,
  //   lastFocusedWindow: true,
  // });

  // const url = tabs.length && tabs[0].url;

  // const response = await browser.runtime.sendMessage({
  //   msg: 'hello',
  //   url,
  // });

  // console.emoji('🦄', response);

  document.getElementById('copy__json').addEventListener('click', () => {
    // return openWebPage(
    //   'https://github.com/butterops/refer'
    // );
  });

  document.getElementById('wiki__button').addEventListener('click', () => {
    return openWebPage('https://github.com/butterops/refer/wiki/');
  });

  document.getElementById('options__button').addEventListener('click', () => {
    return openWebPage('options.html');
  });
});
