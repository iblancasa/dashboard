#!/usr/bin/env node

// Load environment variables
require('dotenv').config({path: __dirname + '/.env'})

// Node native libraries
var path = require('path')
var http = require('http')

// NPM dependencies
var forever = require('forever-monitor')
var cmd = require('commander')
var mosca = require('mosca')

// Project libraries
var app = require('./src')
var bootOnload = require('./src/boot-on-load')

const DASHBOARD_DEAMON = path.join(__dirname, './bin/deamon.js')
const DASHBOARD_DNS = path.join(__dirname, './bin/dns.js')
const DASHBOARD_NETWORK = path.join(__dirname, './bin/discover-network.js')
const DASHBOARD_TUNNEL = path.join(__dirname, './bin/tunnel-c.js')
const DASHBOARD_IAMALIVE = path.join(__dirname, './bin/')

cmd
.version('0.1.42')
.option('-p, --port <n>', 'Port to start the HTTP server', parseInt)
.parse(process.argv)

// Launch server with web sockets
var server = http.createServer(app)
var broker = new mosca.Server({})
broker.attachHttpServer(server)

process.env.PORT = cmd.port || process.env.PORT
process.env.LOCAL_URL = 'http://localhost:' + process.env.PORT

server.listen(process.env.PORT, function () {
  console.log('👾  Netbeast dashboard started on %s:%s', server.address().address, server.address().port)
  bootOnload()
})

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
  env: { 'NETBEAST_PORT': process.env.PORT},
  max: 1
})

network.title = 'netbeast-network'
network.start()

var tunnel = new (forever.Monitor)(DASHBOARD_TUNNEL, {
  env: { 'NETBEAST_PORT': process.env.PORT,
  'RELAY_PORT': process.env.RELAY_PORT,
  'SERVER_IP': process.env.SERVER_IP },
  max: 1
})

tunnel.title = 'netbeast-tunnel'
tunnel.start()

var iamalive = new (forever.Monitor)(DASHBOARD_IAMALIVE, {
  env: { 'NETBEAST_PORT': process.env.PORT,
  'IAMALIVE_SPORT': process.env.IAMALIVE_SPORT,
  'IAMALIVE_CPORT': process.env.IAMALIVE_CPORT,
  'SERVER_IP': process.env.SERVER_IP },
  max: 1
})

iamalive.title = 'netbeast-tunnel'
iamalive.start()

process.on('exit', function () {
  deamon.kill('SIGTERM')
  dns.kill('SIGTERM')
})

process.on('uncaughtException', function (err) {
  console.error(err.stack)
})
