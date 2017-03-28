var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var exphbs  = require('express-handlebars')
var axios = require('axios')

var period = require('./api/period')
var depth = require('./api/depth')
var trades = require('./api/trades')

var BASE_URL = require('./lib/baseUrl')

var app = express()

// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// app.use(favicon())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'static')))

app.use('/period', period)
app.use('/depth', depth)
app.use('/trades', trades)

// entry
app.get('/', function(req, res) {
  res.redirect('/okcoin_btc_cny')
})

app.get(/.+_(btc|ltc)_(usd|cny)/, function(req, res) {
  axios.get(BASE_URL + '/ticker?symbol=' + req.path.split('/')[1])
  .then(function(response) {
    res.render('index', {
      price: response.data.last
    })
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

var PORT

if (process.env.NODE_ENV === 'production') {
  PORT = 80
} else {
  PORT = 8080
}

app.listen(PORT, function() {
  console.log('Server running on http://127.0.0.1:' + PORT)
})
