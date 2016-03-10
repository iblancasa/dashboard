#!/usr/bin/env node

require('./lib/init')
var path = require('path')
var http = require('http')
var https = require('https')

// NPM dependencies
var forever = require('forever-monitor')
var cmd = require('commander')
var mosca = require('mosca')
var fs = require('fs')

process.chdir(__dirname)
// Project libraries
var bootOnload = require('./src/boot-on-load')

// Project libraries
var app = require('./src')
const DASHBOARD_NETWORK = path.join(__dirname, './bin/network.js')
const DASHBOARD_DEAMON = path.join(__dirname, './bin/deamon.js')
const DASHBOARD_DNS = path.join(__dirname, './bin/dns.js')

const options = {
  key: fs.readFileSync(__dirname + '/ssl/dashboard-key.pem'),
  cert: fs.readFileSync(__dirname + '/ssl/dashboard-cert.pem')
}

cmd
.version('0.1.42')
.option('-p, --port <n>', 'Port to start the HTTP server', parseInt)
.option('-sp, --securePort <n>', 'Secure Port to start the HTTPS server', parseInt)
.parse(process.argv)

// Launch server with web sockets
var server = http.createServer(app)
var broker = new mosca.Server({})
broker.attachHttpServer(server)

// ----- WARNING: DONT KNOW IF attachHttpServer here is correct. Need to have a look on the internet about this
var secureServer = https.createServer(options)
broker.attachHttpServer(secureServer)
// ----------------------------------------------------------------------------------------------------------

process.env.SECURE_PORT = cmd.securePort || process.env.SECURE_PORT
process.env.PORT = cmd.port || process.env.PORT

server.listen(process.env.PORT, function () {
  bootOnload()
})

/* secureServer.listen(process.env.SECURE_PORT, function () {
  console.log('👾  Netbeast secure dashboard started on %s:%s', secureServer.address().address, secureServer.address().port)
  bootOnload()
}) */

var dns = new (forever.Monitor)(DASHBOARD_DNS, {
  env: { 'NETBEAST_PORT': process.env.PORT },
  max: 1
})

dns.title = 'netbeast-dns'
dns.start()

var deamon = new (forever.Monitor)(DASHBOARD_DEAMON, {
  env: { 'NETBEAST_PORT': process.env.PORT },
  max: 1
})

deamon.title = 'netbeast-deamon'
deamon.start()

var network = new (forever.Monitor)(DASHBOARD_NETWORK, {
  env: { 'NETBEAST_PORT': process.env.PORT },
  max: 1
})

network.title = 'netbeast-network'
network.start()

process.on('exit', function () {
  deamon.kill('SIGTERM')
  dns.kill('SIGTERM')
})

process.on('uncaughtException', function (err) {
  console.error(err.stack)
})
