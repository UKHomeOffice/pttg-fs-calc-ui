/* global angular moment _ ga Clipboard */

'use strict'

var fsModule = angular.module('hod.fs')

// #### ROUTES #### //
fsModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  // define a route for the details of the form
  $stateProvider.state({
    name: 'fsResult',
    url: '/result',
    title: 'Financial Status : Details',
    parent: 'fsDetails',
    views: {
      'content@': {
        templateUrl: 'modules/fs/templates/fsResult.html',
        controller: 'FsResultCtrl'
      }
    }
  })
}])

fsModule.run(['$rootScope', '$state', 'FsService', function ($rootScope, $state, FsService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var fs = FsService.getApplication()
    if (toState.name === 'fsResult' && !FsService.hasThresholdInfo(fs)) {
      // you cannot be on the 'fsResult' route/view if the result info is not present
      event.preventDefault()
      $state.go('fsDetails', toParams)
      return false
    }
  })
}])

fsModule.controller('FsResultCtrl', ['$rootScope', '$scope', '$state', '$filter', '$timeout', 'FsService', 'FsInfoService', function ($rootScope, $scope, $state, $filter, $timeout, FsService, FsInfoService) {
  var fs = FsService.getApplication()
  $scope.threshold = fs.thresholdResponse.data.threshold
  $scope.leaveEndDate = fs.thresholdResponse.data.leaveEndDate
  $scope.criteria = FsService.getCriteria(fs)
  $scope.results = FsService.getResults(fs)
  $scope.seconds = 60
  $scope.numTry = 0
  $scope.numTryLimit = 5
  $scope.timerScope = null
  $scope.doNext = []

  // show hide blocks of text and set display strings as required
  $scope.render = function (state) {
    $scope.state = state

    var label = 't' + fs.tier + '-' + fs.applicantType + '-' + fs.variantType

    switch (state) {
      case 'ERROR':
        FsService.track('result', 'consenterror', label)
        $scope.stateTitle = 'Error'
        $scope.stateReason = 'Something went wrong, please try again later.'
        break
      case 'CALCULATOR':
        FsService.track('result', 'calculator', label)
        break
    }

    $rootScope.$broadcast('focusOnH1')
  }

  // set the default status
  $scope.render('CALCULATOR')

  // #### COPY AND PASTE ####
  // init the clipboard object
  var clipboard = new Clipboard('#copyBtn', {
    text: function () {
      return FsService.getPlainTextResults(fs)
    }
  })

  var timeoutResetButtonText = function () {
    $timeout(function () {
      $scope.showCopied = false
      $scope.$applyAsync()
    }, 2000)
  }

  // $scope.showCopied = true
  clipboard.on('success', function (e) {
    $scope.showCopied = true
    $scope.$applyAsync()
    e.clearSelection()
    timeoutResetButtonText()
  })
  clipboard.on('error', function (e) {
    console.log('ClipBoard error', e)
    $scope.$applyAsync()
  })
}])
