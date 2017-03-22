var express = require('express');
var axios = require('axios');

var app = express();

app.use(express.static(__dirname + '/static'));

// ======================================
app.get('/kline', function(req, res) {
  // var url = 'https://s2.bitcoinwisdom.com/period?step=900&sid=596cf1c1&symbol=okcoinbtccny&nonce=1489925744008';
  // var url = 'http://api.qkl123.com/api/getKline.php?symbol=okcoin_btc_cny&step=900';
  // var url = 'https://www.okcoin.cn/api/v1/kline.do?symbol=btc_cny&type=15min';
  var url = 'https://k.sosobtc.com/data/period?symbol=' + req.query.symbol.replace(/_/g, '') + '&step=' + req.query.step;

  axios.get(url)
    .then(function(response) {

      var data = response.data;
      var ret = [];

      data.forEach(function(item) {

        // /* qkl123
        /*
        ret.push([
            item[0],
            null,
            null,
            item[3], // open
            item[4], // close
            item[5], // high
            item[6], // low
            item[7], // btc volume
            null,
            null,
            item[7]*7100 // cny volume
        ]);
        */

        ret.push([
            item[0],
            null,
            null,
            item[1], // open
            item[4], // close
            item[2], // high
            item[3], // low
            item[5], // btc volume
            null,
            null,
            item[5]*7100 // cny volume
        ]);

        /*
        ret.push([
          parseInt(item[0]/1000),
          null,
          null,
          item[1],
          item[4],
          item[2],
          item[3],
          item[5],
          null,
          null,
          item[4]*7100
        ]);
        */

        /* bitcoin wisdom
        ret.push([
            // parseInt(item[0]/1000),
            item[0],
            0,
            0,
            item[3],
            item[4],
            item[5],
            item[6],
            item[7],
            0,
            0,
            item[10]
        ]);
        */
      });

      res.json(ret);
    });
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/cw', function(req, res) {
  res.sendFile(__dirname + '/cw.html');
});

app.listen(8080, function() {
  console.log('fuck it...... 8080');
});
