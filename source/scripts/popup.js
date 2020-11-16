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
var flattenObject = function (ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

document.addEventListener('DOMContentLoaded', async () => {

  read('capturedReference', null)
    .then((result) => {

      //json
      // console.log(JSON.stringify(result))

      //screenshot
      // $('#screenshot').attr('src', result.info[3].value)

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

      var flatResult = flattenObject(result);
      for (var key in flatResult) {
        var tbl_row = tbl_body.insertRow();
        tbl_row.className = odd_even ? "odd" : "even";

        var cell1 = tbl_row.insertCell();
        cell1.appendChild(document.createTextNode(key.toString()));

        var cell2 = tbl_row.insertCell();
        if (flatResult[key].toString().startsWith("data:image")) {
          function img_create(src, alt, title) {
            var img = document.createElement('img');
            img.src = src;
            if (alt != null) img.alt = alt;
            if (title != null) img.title = title;
            return img;
          }
          cell2.appendChild(img_create(flatResult[key]));
        } else {
          cell2.appendChild(document.createTextNode(flatResult[key].toString()));
        }
        odd_even = !odd_even;
      }
      $("#all-fields").html(tbl);

      document.getElementById('download__json').addEventListener('click', () => {
        var _myArray = JSON.stringify(flatResult, null, 4); //indentation in json format, human readable
        var vLink = document.createElement('a'),
          vBlob = new Blob([_myArray], { type: "octet/stream" }),
          vName = `reference-web-clip@${flatResult["meta.time"]}.json`,
          vUrl = window.URL.createObjectURL(vBlob);
    
        vLink.setAttribute('href', vUrl);
        vLink.setAttribute('download', vName);
        vLink.click();
      });
    }).catch(console.error)

  document.getElementById('wiki__button').addEventListener('click', () => {
    return openWebPage('https://github.com/butterops/refer/wiki/');
  });

  document.getElementById('options__button').addEventListener('click', () => {
    return openWebPage('options.html');
  });
});
