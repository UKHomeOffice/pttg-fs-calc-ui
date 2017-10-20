/* global angular moment _ ga */

'use strict'

var fsModule = angular.module('hod.fs', ['ui.router'])

// #### ROUTES #### //
fsModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  // define a route for the details of the form
  $stateProvider.state({
    name: 'fsApplicantType',
    url: '/fs/t:tier',
    title: 'Financial Status : Application type',
    views: {
      'content@': {
        templateUrl: 'modules/fs/templates/fs.html',
        controller: 'FsApplicantTypeCtrl'
      },
      'nav@': {
        templateUrl: 'modules/fs/templates/fsNav.html',
        controller: 'FsNavCtrl'
      }
    }
  })

  $stateProvider.state({
    name: 'fsVariantType',
    url: '/:applicantType',
    title: 'Financial Status : Variant type',
    parent: 'fsApplicantType',
    views: {
      'content@': {
        templateUrl: 'modules/fs/templates/fs.html',
        controller: 'FsApplicantTypeCtrl'
      }
    }
  })
}])

fsModule.run(['$rootScope', function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $rootScope.tier = Number(toParams.tier) || 0
  })
}])

fsModule.controller('FsApplicantTypeCtrl', ['$scope', '$state', 'FsService', 'FsInfoService', function ($scope, $state, FsService, FsInfoService) {
  FsService.reset()
  var fs = FsService.getApplication()
  FsService.setKnownParamsFromState(fs, $state.params)

  var t = Number($state.params.tier)
  $scope.tier = FsInfoService.getTier(t)
  $scope.applicantType = fs.applicantType

  var hasVariants = ($scope.tier.variants.length > 0)
  var variantFirst = FsInfoService.variantFirst($scope.tier)

  console.log(fs)

  if (fs.variantType) {
    var v = FsInfoService.getVariant(t, fs.variantType)
    if (v.dependantsOnlyOption === false || $scope.tier.dependantsOnlyOption === false) {
      // why are we here? there are no more choices to make!
      $state.go('fsDetails', {applicantType: fs.variantType, variantType: 'main'})
      return
    }
  } else if ($state.current.name === 'fsVariantType' && !hasVariants) {
    // why are we here? There are no variants to choose from
    $state.go('fsDetails', {applicantType: fs.applicantType, variantType: 'details'})
    return
  }

  $scope.showVariant = ($state.current.name === 'fsApplicantType' && variantFirst) || ($state.current.name === 'fsVariantType' && !variantFirst)

  $scope.selectApplicantType = function (t) {
    // MAIN or DEPENDANT ONLY
    if (variantFirst) {
      // the variant question has already been asked
      $state.go('fsDetails', {variantType: t})
    } else if (hasVariants) {
      // need to choose a variant option
      $state.go('fsVariantType', {applicantType: t})
    } else {
      // there are no variants to choose so go to the form
      $state.go('fsDetails', {applicantType: t, variantType: 'details'})
    }
  }

  $scope.selectVariantType = function (v) {
    // SELECTING a SUBTYPE or VARIANT
    if (variantFirst) {
      // the variant question has already been asked
      $state.go('fsVariantType', {applicantType: v})
    } else {
      // go to the form
      $state.go('fsDetails', {variantType: v})
    }
  }
}])
