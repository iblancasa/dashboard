// require sistema

// modules
var express = require('express')

// librerias propias
var	Resource = require('../models/resource.js')

var	router = express.Router()

router.route('/resources')

.get(function (req, res, next) {
  Resource.find(req.query, function (err, resources) {
    if (err) return next(err)

    res.json({ error: {}, data: resources })
  })
})

.post(function (req, res, next) {
  Resource.findOne(req.body, function (err, resource) {
    if (!resource || err === 'No Row Found!') {
      Resource.create(req.body, function (err, item) {
        if (err) res.status(500).send({ error: err, data: {} })
        else res.status(204).end()
      })
    } else if (err && err !== 'No Row Found!') res.status(500).send({ error: err, data: {} })
    else res.status(500).send({ error: 'This action exists!', data: {} })
  })
})

.patch(function (req, res, next) {
  Resource.findOne(req.query, function (err, resource) {
    if (err) res.status(500).send({ error: err, data: {} })
    else {
      Resource.update(req.query, req.body, function (err) {
        if (err) res.status(500).send({ error: err, data: {} })
        else res.status(204).end()
      })
    }
  })
})

.delete(function (req, res, next) {
  Resource.find(req.query, function (err, resources) {
    if (err) res.status(500).send({ error: err, data: {} })
    else {
      resources.forEach(function (item) {
        item.destroy(function (err) {
          if (err) res.status(500).send({ error: err, data: {} })
          else res.status(204).end()
        })
      })
    }
  })
})

module.exports = router
