'use strict'

/* global angular, toastr */

angular.module('Dashboard')
.factory('Activity', ['$http', '$sce', '$location',
function ActivityFactory ($http, $sce, $location) {
  var self = {}
  self.all = function () {
    return $http.get('/activities/')
  }

  self.stop = function (app) {
    return $http.delete('/activities/' + app)
  }

  self.open = function (app) {
    return $http.get('/activities/' + app)
    .error(function (data, status, headers, config) {
      $location.path('/')
      $location.replace()
    })
  }

  self.launch = function (app) {
    return $http.post('/activities/' + app)
  }

  return self
}])
