var express = require('express')
var Showdown = require('showdown')
var config = require('../../config')
var fs = require('fs-extra')
var path = require('path')
var installer = require('../installer')
var launcher = require('../launcher')
var App = require('../models/app')
var NotFound = require('../util/not-found')
var InvalidFormat = require('../util/invalid-format')
var router = express.Router()

// GET
router.route('/apps')
.post(installer.multer, installer.process, installer.git)
.get(function (req, res, next) {
  App.all(function (err, files) {
    if (err) return next(err)

    res.json(files)
  })
})

router.route('/apps/:name')
.get(function (req, res, next) {
  App.getPackageJson(req.params.name, function (err, packageJson) {
    if (err) return next(err)

    res.json(packageJson)
  })
})
.put(function (req, res, next) {
  var file = path.join(config.appsDir, req.params.name, 'package.json')
  fs.writeJson(file, req.body, function (err) {
    if (err) {
      next(new InvalidFormat('Not a valid package.json'))
    } else {
      res.status(204).end()
    }
  })
})
.delete(function (req, res, next) {
  launcher.stop(req.params.name, function (err) {
    if (err) {
      return next(new Error('Launcher could not stop the app'))
    } else {
      App.delete(req.params.name, function (err) {
        if (err && err.code === 404) {
          return next(new NotFound())
        } else if (err) {
          return next(err)
        } else {
          res.status(204).end()
        }
      })
    }
  })
})

router.get('/apps/:name/logo', function (req, res) {
  var pkgJson = path.join(config.appsDir, req.params.name, 'package.json')
  try {
    var app = fs.readJsonSync(pkgJson)
    var appRoot = path.join(config.appsDir, app.name)
    var appLogo = path.join(appRoot, app.logo)
    res.sendFile(appLogo)
  } catch (e) {
    res.sendFile(path.join(config.publicDir, 'img/dflt.png'))
  }
})

router.get('/apps/:name/port?', function (req, res) {
  var app = launcher.getApp(req.params.name)
  if (app) {
    console.dir(app.port)
    res.json(app.port)
  } else {
    res.status(403).send('App not running')
  }
})

router.get('/apps/:name/readme', function (req, res, next) {
  var readme = path.join(config.appsDir, req.params.name, 'README.md')
  if (!fs.existsSync(readme)) {
    return res.send('This app does not have a README.md')
  }

  fs.readFile(readme, 'utf8', function (err, data) {
    if (err) return next(err)
    var converter = new Showdown.converter()
    var html = converter.makeHtml(data)
    res.send(html)
  })
})

router.get('/apps/:name/package', function (req, res, next) {
  App.getPackageJson(req.params.name, function (err, data) {
    if (err) return next(err)

    res.header('Content-Type', 'text/plain')
    res.send('' + data)
  })
})

module.exports = router
