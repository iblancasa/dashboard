var express = require('express')
var path = require('path')
var fs = require('fs-extra')
var logger = require('morgan')
var config = require('../config')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')

var app = module.exports = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(favicon(path.join(config.publicDir, 'img/xway.png')))

app.use(express.static(config.publicDir))

app.use(require('./routes'))

// error with Error classes
app.use(function (err, req, res, next) {
  console.error(err.stack)
  if (!err.statusCode || err.statusCode === 500) {
    fs.writeJson('./error-report', {err: err, req: req})
  }
  res.status(err.statusCode || 500).send(err.message)
})
