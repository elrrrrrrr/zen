var urllib = require('urllib');
var list = require('./data.json').dataList || [];
var fs = require('fs');

var url = 'https://api.github.com/zen';

var option = {
  timeout: 10000
}


function hasEnough() {
  var result = false;
  if (list.length > 10) {
    result = true;
  }
  return result;
}

function doFetch(cb) {
  urllib.request(url, option, function (err, data) {
    if (err) {
      //console.log(err);
      return cb();
      //TODO
    }
    var result = data.toString();
    if (list.indexOf(result) == -1) {
      list.push(result);
    }
    console.log(result);
    cb && cb();
  });
}

function saveData() {

  if (hasEnough()) {
    fs.writeFileSync('./data.json', JSON.stringify(list, 2, 2));  
  } else {
    doFetch(saveData);
  }
}

doFetch(saveData)