var dgram = require('dgram')
var client = dgram.createSocket('udp4')

console.log('Server ' + process.env.SERVER_IP + ':' + process.env.IAMALIVE_SPORT)

var intervalID = setInterval(function () {
  require('getmac').getMac(function (err, macAddress) {
    if (err) throw err
    var msg = new Buffer(macAddress)
    client.send(msg, 0, msg.length, 41234, process.env.SERVER_IP, function (err) {
      if (err) {
        throw err
      }
      // client.close()
    })
  })
}, 1000)

client.on('message', function (msg, rinfo) {
  console.log('client got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port)
})

client.on('listening', function () {
  var address = client.address()
  console.log('client listening' + address.address + ':' + address.port)
})

client.bind(41235)
