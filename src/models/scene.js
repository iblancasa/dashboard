var helper = require('../helpers/scene')

helper.createTable(function (err, data) {
  if (err) throw err
})

function Scene (item) {
  this.id = item.id
  this.sceneid = item.sceneid
  this.location = item.location
  this.status = item.status
  this.bri = item.bri
  this.hue = item.hue
  this.sat = item.sat
}

Scene.create = function (item, done) {
  return (new Scene(item)).save(done)
}

Scene.prototype.destroy = function (done) {
  helper.deleteDevice(this, function (err) {
    if (err) return done(err)
    return done()
  })
}

Scene.find = function (query, done) {
  var result = []
  helper.findDevice(query, function (err, row) {
    if (err) return done(err)
    if (!row) return done('No Row Found!')

    row.forEach(function (action) {
      result.push(new Scene(action))
    })
    return done(null, result)
  })
}

Scene.findOne = function (query, done) {
  helper.findDevice(query, function (err, row) {
    if (err) done(err)
    else if (!row) done('No Row Found!')
    else done(null, new Scene(row[row.length - 1]))
  })
}

Scene.prototype.save = function (done) {
  var self = this
  var schema = {
    id: this.id,
    sceneid: this.sceneid,
    location: this.location,
    status: this.status,
    bri: this.bri,
    hue: this.hue,
    sat: this.sat
  }
  helper.insertDevice(schema,	function (err) {
    if (err) return done(err)

    return Scene.findOne({id: self.id}, done)
  })
}

Scene.update = function (query, value, done) {
  helper.updateDevice(query, value, function (err) {
    if (err) return done(err)

    return done()
  })
}

module.exports = Scene
