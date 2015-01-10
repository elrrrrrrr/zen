var urllib = require('urllib');
var list = require('./data.json').dataList || [];
var fs = require('fs');

var url = 'https://api.github.com/zen';
var cursor = 0 ;
var MAX_COUNT = 5;

var option = {
  timeout: 10000
}

function hasEnough(data) {
  if (cursor > MAX_COUNT) {
    return true;
  }
  if (list.indexOf(data) != -1) {
    cursor ++;
  } else {
    cursor = 0;
  }
  return false;
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
    cb && cb(result);
  });
}

function saveData(data) {

  if (hasEnough(data)) {
    fs.writeFileSync('./data.json', JSON.stringify(list, 2, 2));  
  } else {
    doFetch(saveData);
  }
}

function showRandom() {
  
  console.log(list)
}

doFetch(saveData)