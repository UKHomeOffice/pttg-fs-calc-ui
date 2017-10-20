/* global angular */

'use strict'

var fsModule = angular.module('hod.fs')

fsModule.controller('FsNavCtrl', ['$scope', 'FsService', 'FsInfoService', function ($scope, FsService, FsInfoService) {
  $scope.tiers = FsInfoService.getTiers()
  FsService.reset()
}])
