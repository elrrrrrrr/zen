#!/usr/bin/env node
var urllib = require('urllib');
var list = require('./data.json') || [];
var fs = require('fs');

var url = 'https://api.github.com/zen';
var cursor = 0 ;
var MAX_COUNT = 10; 

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
    if (JSON.parse(result).message) {
      cb();
    }
    if (list.indexOf(result) == -1) {
      list.push(result);
    }
    console.log(result);
    if (hasEnough(result)) {
      cb && cb(result);
    }else {
      doFetch(saveData);
    }
  });
}

function saveData() {
    fs.writeFileSync('./data.json', JSON.stringify(list, 2, 2));  
}

function showRandom() {
  var items = list;
  var random = items[Math.floor(Math.random()*items.length)];  
  var color = 36; 
  console.log("\x1b[%sm%s",color,random);
}

//doFetch(saveData)
//showRandom();
if (process.argv[2] == 'fetch') {
  doFetch(saveData);
} else {
  showRandom();
}
