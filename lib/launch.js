var request = require('superagent')

module.exports = function (app) {
  var url = 'http://' + 'localhost' + ':' + '8000' + '/api/activities/' + app

  request.post(url, function (err, resp, body) {
    if (err) throw err
    console.log('Done.')
  })
}
