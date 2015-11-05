var async = require('async')

var App = require('./models/app')
var Activity = require('./models/activity')

// start apps that must be initialized on boot
module.exports = function bootOnload () {
  App.all(function (err, apps) {
    if (err) throw err

    async.map(apps, function (app, done) {
      if (!app.bootOnLoad) return done(null)

      console.log('Launching %s', app.name)
      Activity.boot(app.name, function (err, port) {
        if (err) return done(err)

        console.info('%s launched on port %s', app.name, port)
        done(null, port)
      })
    },
    function (err) {
      if (err) throw err
    })
  })
}
