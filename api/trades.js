var express = require('express')
var router = express.Router()
var axios = require('axios')
var BASE_URL = require('../lib/baseUrl')

router.get('/', function(req, res) {
  var query = req.query

  // FIXME: query.since === NaN
  axios.get(
    BASE_URL + '/trades?' +
    'symbol=' + query.symbol +
    '&nonce=' + query.nonce +
    '&since=' + query.since +
    '&sid=' + query.sid
  )
  .then(function(response) {
    res.json(response.data)
  }, function(error) {
    res.json({
      status: 'failure',
      message: 'trades'
    })
  })
})

module.exports = router
