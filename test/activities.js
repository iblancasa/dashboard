#!/usr/bin/env node
/* global describe, before, after, it */

var chai = require('chai')
var should = chai.should()

var request = require('request')
var App = require('../src/models/app')
var config = require('../config')
var fs = require('fs-extra')
var path = require('path')

const URL = 'http://localhost:' + config.port
const APP_PATH = './test/app.tar.gz'
const s = 1000 // seconds

// Test styling
// http://chaijs.com/guide/styles/

// tutorial
// http://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018

describe('Activities', function () {
  before('it should install myapp for tests', function (done) {
    fs.copy(APP_PATH + '.bck', APP_PATH, function (err) {
      should.not.exist(err)
      App.install(APP_PATH, function (err) {
        should.not.exist(err)
        done()
      })
    })
  })

  it('should not be running', function (done) {
    request(URL + '/activities/myapp', function (err, resp, body) {
      should.not.exist(err)
      resp.statusCode.should.equal(404)
      done()
    })
  })

  it.skip('should show no apps running', function (done) {
    request(URL + '/activities/', function (err, resp, body) {
      should.not.exist(err)
      resp.statusCode.should.equal(200)
      // expect(body).to.have.length.above(1)
      JSON.parse(body).should.have.length.below(1)
      done()
    })
  })

  after('it should remove myapp', function (done) {
    fs.remove(path.join(config.appsDir, 'myapp'), function (err) {
      should.not.exist(err)
      fs.copy(APP_PATH + '.bck', APP_PATH, function (err) {
        should.not.exist(err)
        done()
      })
    })
  })
})
