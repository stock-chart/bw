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

// /* sosobtc
/*
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
*/

// /* okcoin
/*
ret.push([
  parseInt(item[0]/1000),
  null,
  null,
  item[1], // open
  item[4], // close
  item[2], // high
  item[3], // low
  item[5], // volume
  null,
  null,
  item[4]*7100
]);
*/

var express = require('express')
var axios = require('axios')
var app = express()

app.use(express.static(__dirname + '/static'))

app.get('/period', function(req, res) {
  // var url = 'http://api.qkl123.com/api/getKline.php?symbol=okcoin_btc_cny&step=14400'
  // var url = 'https://k.sosobtc.com/data/period?symbol=' + req.query.symbol.replace(/_/g, '') + '&step=' + req.query.step
  
  // var url = 'https://s2.bitcoinwisdom.com/period?step=900&sid=596cf1c1&symbol=okcoinbtccny&nonce=1489925744008'

  var symbols = {
    okcoin_btc_cny: 'okcoinbtccny',
    okcoin_ltc_cny: 'okcoinltccny',
    huobi_btc_cny: 'huobibtccny',
    huobi_ltc_cny: 'huobiltccny',
    btcchina_btc_cny: 'btcchinabtccny',
    btcchina_ltc_cny: 'btcchinaltccny',
    coinbase_btc_usd: 'coinbasebtcusd',
    bitfinex_btc_usd: 'bitfinexbtcusd',
    bitfinex_ltc_usd: 'bitfinexltcusd',
    btce_btc_usd: 'btcebtcusd',
    btce_ltc_usd: 'btceltccny'
  }

  var query = req.query
  var url = 'https://s2.bitcoinwisdom.com/period?symbol=' + symbols[query.symbol] + '&step=' + query.step + '&nonce' + Date.now()

  axios.get(url)
  .then(function(response) {
    var data = response.data
    var ret = []

    data.forEach(function(item) {
      ret.push([
          item[0],
          null,
          null,
          item[3], // O
          item[4], // C
          item[5], // H
          item[6], // L
          item[7], // V
          null,
          null,
          item[10]
      ])
    })

    res.json(ret)
  }, function(error) {
    res.json({
      status: 'failure',
      message: 'Failed to fetch data from server, please try again later.'
    })
  })
})

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

var PORT = 8080;

app.listen(PORT, function() {
  console.log('Server running on http://127.0.0.1:' + PORT)
})
