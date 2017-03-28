var express = require('express')
var axios = require('axios')
var router = express.Router()
var BASE_URL = require('../lib/baseUrl')

router.get('/', function(req, res) {
  var query = req.query

  axios.get(
    BASE_URL + '/ticker?' +
    'symbol=' + query.symbol +
    '&nonce=' + Date.now() +
    '&sid=5a34ec75'
  )
  .then(function(response) {
    res.json(response.data)
  }, function(error) {
    res.json({
      status: 'failure',
      message: 'failed to fetch data from server, please try again later.'
    })
  })
})

module.exports = router
