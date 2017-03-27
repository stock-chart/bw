var express = require('express')
var router = express.Router()
var axios = require('axios')
var BASE_URL = require('../lib/baseUrl')

router.get('/', function(req, res) {
  var query = req.query

  axios.get(
    BASE_URL + '/depth?' +
    'symbol=' + query.symbol.replace(/_/g, '') +
    '&nonce' + Date.now() +
    '&sid=5a34ec75'
  )
  .then(function(response) {
    var data = response.data

    res.json(data)
  }, function(error) {
    res.json({
      status: 'success',
      message: 'depth'
    })
  })
})

module.exports = router
