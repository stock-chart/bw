var express = require('express')
var request = require('request')
var FeedParser = require('feedparser')
var router = express.Router()

router.get('/', function(req, res) {
  var ret = []

  var reqFeed = request('http://www.8btc.com/feed')
  var feedparser = new FeedParser()

  reqFeed.on('error', function(err) {
    // handle any request errors
  })

  reqFeed.on('response', function(response) {
    var stream = this // `this` is `reqFeed`, which is a stream

    if (response.statusCode !== 200) {
      this.emit('error', new Error('Bad status code'))
    }
    else {
      stream.pipe(feedparser)
    }
  })

  feedparser.on('error', function(err) {
    // always handle errors
  })

  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this // `this` is `feedparser`, which is a stream
    var meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item

    while (item = stream.read()) {
      ret.push({
        title: item.title,
        link: item.link,
        date: item.date
      })
    }
  })

  feedparser.on('end', function() {
    res.json(ret)
  })
})

module.exports = router
