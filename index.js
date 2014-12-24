var urllib = require('urllib');

var url = 'https://api.github.com/zen';

var option = {
  timeout: 500000
}

urllib.request(url, option, function (err, data, res) {
  if (err) {
    console.log(err);
    //TODO
  }
  console.log(data.toString());
});