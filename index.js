var express = require('express');

var app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/xmrbtc.html');
});

app.get('/cw', function(req, res) {
  res.sendFile(__dirname + '/cw.html');
});

app.listen(8080, function() {
  console.log('fuck it...... 8080');
});
