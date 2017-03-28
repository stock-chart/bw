var express = require('express')
var axios = require('axios')
var router = express.Router()
var BASE_URL = require('../lib/baseUrl')

router.get('/', function(req, res) {
  var query = req.query

  axios.get(
    BASE_URL + '/period?' +
    'symbol=' + query.symbol +
    '&step=' + query.step +
    '&nonce=' + Date.now() +
    '&sid=5a34ec75'
  )
  .then(function(response) {
    var data = response.data
    var ret = []

    data.forEach(function(item) {
      ret.push([
          item[0],
          null,
          null,
          item[3], // o
          item[4], // c
          item[5], // h
          item[6], // l
          item[7], // v
          null,
          null,
          item[10]
      ])
    })

    res.json(ret)
  }, function(error) {
    res.json({
      status: 'failure',
      message: 'failed to fetch data from server, please try again later.'
    })
  })
})

module.exports = router
