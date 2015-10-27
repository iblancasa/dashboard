#!/usr/bin/env node
/* global describe, it */

var chai = require('chai')
var should = chai.should()
var expect = chai.expect

var request = require('request')
var config = require('../config')
var path = require('path')
var fs = require('fs')

var s = 1000 // seconds

const URL = 'http://localhost:' + config.port

// Test styling
// http://chaijs.com/guide/styles/

// tutorial
// http://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018

describe('Apps', function () {
  it('should upload myapp to repository', function (done) {
    this.timeout(8 * s) // this takes time
    var req = request.post(URL + '/apps', function (err, resp, body) {
      should.not.exist(err)
      body.should.equal('')
      expect(resp.statusCode).to.equal(204)
      fs.stat(path.join(config.appsDir, 'myapp'), function (err, stats) {
        should.not.exist(err)
        expect(stats.isDirectory()).to.equal(true)
        done()
      })
    })
    var form = req.form()
    var app = path.join(__dirname, 'app.tar.gz')
    form.append('file', fs.createReadStream(app))
  })

  it('should return application package.json', function (done) {
    request(URL + '/apps/myapp', function (err, resp, body) {
      should.not.exist(err)
      resp.statusCode.should.equal(200)
      expect(JSON.parse(body)).to.be.an('Object')
      done()
    })
  })

  it('should upload app @ github to repo', function (done) {
    this.timeout(20 * s) // this also takes time
    var req = request.post(URL + '/apps', function (err, resp, body) {
      should.not.exist(err)
      expect(resp.statusCode).to.equal(204)
      fs.stat(path.join(config.appsDir, 'xy-get-started'), function (err, stats) {
        should.not.exist(err)
        expect(stats.isDirectory()).to.equal(true)
        done()
      })
    })
    var form = req.form()
    var app = 'https://github.com/netbeast-co/get-started'
    form.append('url', app)
  })

  it('should return all apps names', function (done) {
    request(URL + '/apps', function (err, resp, body) {
      should.not.exist(err)
      resp.statusCode.should.equal(200)
      expect(JSON.parse(body)).to.be.an('Array')
      done()
    })
  })

  it("should remove 'myapp' from repository", function (done) {
    request.del(URL + '/apps/myapp', function (err, resp, body) {
      should.not.exist(err)
      expect(resp.statusCode).to.equal(204)
      body.should.equal('')
      done()
    })
  })

  it("should remove 'xy-get-started' from repository", function (done) {
    request.del(URL + '/apps/xy-get-started', function (err, resp, body) {
      should.not.exist(err)
      expect(resp.statusCode).to.equal(204)
      body.should.equal('')
      done()
    })
  })

  it('should return 404 when an app does not exist', function (done) {
    request.del(URL + '/apps/tsaebten', function (err, resp, body) {
      should.not.exist(err)
      expect(resp.statusCode).to.equal(404)
      body.should.be.a('String')
      done()
    })
  })
})
