var path = require('path')

var fs = require('fs-extra')
var logger = require('morgan')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')

var broker = require('./helpers/broker')
var config = require('../config')

var app = module.exports = express()

app.use(logger('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

app.use(require('./middleware/proxy'))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(favicon(path.join(config.publicDir, 'img/favicon.png')))

app.use(require('./middleware/cors'))
app.use(require('./routes'))

app.use(express.static(config.publicDir))

// error with Error classes
app.use(function (err, req, res, next) {
  console.error(err.stack)
  if (!err.statusCode || err.statusCode === 500) {
    fs.appendFile('./.errorlog', err.stack)
  }
  broker.error(err.message)
  res.status(err.statusCode || 500).send(err.message)
})
