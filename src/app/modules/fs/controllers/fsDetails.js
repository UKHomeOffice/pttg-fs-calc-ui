/* global angular moment _ ga */

'use strict'

var fsModule = angular.module('hod.fs')

// #### ROUTES #### //
fsModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  // define a route for the details of the form
  $stateProvider.state({
    name: 'fsDetails',
    url: '/:variantType',
    title: 'Financial Status : Details',
    parent: 'fsVariantType',
    views: {
      'content@': {
        templateUrl: 'modules/fs/templates/fsDetails.html',
        controller: 'FsDetailsCtrl'
      }
    }
  })
}])

fsModule.controller('FsDetailsCtrl', ['$scope', '$state', 'FsService', 'FsInfoService', function ($scope, $state, FsService, FsInfoService) {
  var fs = FsService.getApplication()
  FsService.setKnownParamsFromState(fs, $state.params)

  $scope.fs = fs

  $scope.tier = FsInfoService.getTier(fs.tier)

  if (_.isNull(fs.variantType) && $state.params.variantType !== 'details') {
    // #### ERROR #### //
    // If variantType is null then the state param must be set to the generic term details
    $state.go('fsVariantType')
    return
  }

  $scope.fields = FsInfoService.getFieldsForObject(fs)
  // !!!! originalCourseStartDate is conditional
  if (_.indexOf($scope.fields, 'continuationCourse') !== false) {
    $scope.fields.push('originalCourseStartDate')
  }

  // config for all fields
  $scope.conf = {
    applicationRaisedDate: {
      max: moment().format('YYYY-MM-DD'),
      errors: {
        max: {
          msg: 'Enter a valid "Application raised date"'
        },
        invalid: {
          summary: 'The "Application raised date" is invalid',
          msg: 'Enter a valid "Application raised date"'
        },
        required: {
          msg: 'Enter a valid "Application raised date"',
          summary: 'The "Application raised date" is invalid'
        }
      }
    },
    endDate: {
      validate: function (v, sc) {
        var fs = FsService.getApplication()
        var aDate = moment(fs.applicationRaisedDate, 'YYYY-MM-DD', true)
        var eDate = moment(fs.endDate, 'YYYY-MM-DD', true)
        var err = { summary: 'The "End date" is invalid', msg: 'Enter a valid "End date"' }
        if (!eDate.isValid()) {
            // must be a valid date
          return err
        }

        if (eDate.isAfter(moment.today)) {
            // cannot be in the future
          return err
        }

        if (!aDate.isValid()) {
            // if application raised date is invalid then no more checks can be done
            // as further checks require comparison between end data and application raised date
          return true
        }

        if (eDate.isAfter(aDate)) {
            // end date cannot be after the application raised date
          err.msg = '"End date" cannot be after "Application raised date"'
          return err
        }

        if (eDate.isBefore(aDate.subtract(30, 'days'))) {
            // end date cannot be earlier than 31 days prior
            // to the application raised date
          err.msg = '"End date" is not within 31 days of "Application raised date"'
          return err
        }

        return true
      }
    },
    inLondon: FsInfoService.getFieldInfo('inLondon'),
    courseType: FsInfoService.getFieldInfo('courseType'),
    courseInstitution: FsInfoService.getFieldInfo('courseInstitution'),
    continuationCourse: angular.extend(FsInfoService.getFieldInfo('continuationCourse'), {
      onClick: function (opt, scope) {
        if (opt.value !== 'yes') {
          var fs = FsService.getApplication()
          fs.originalCourseStartDate = ''
        }
      }
    }),
    courseStartDate: {},
    courseEndDate: {
      validate: function (v, sc) {
        var fs = FsService.getApplication()
        var start = moment(fs.courseStartDate, 'YYYY-MM-DD', true)
        var endDateMom = moment(v, 'YYYY-MM-DD', true)
        if (!endDateMom.isValid()) {
          return { summary: 'The "End date of course" is invalid', msg: 'Enter a valid "End date of course"' }
        }
        if (!start.isBefore(endDateMom)) {
          return { summary: 'The "End date of course" is invalid', msg: 'Enter a valid course length' }
        }
        return true
      }
    },
    originalCourseStartDate: {
      required: false,
      validate: function (v, sc) {
        var fs = FsService.getApplication()
        var start = moment(fs.courseStartDate, 'YYYY-MM-DD', true)
        var contOriginalDateMom = moment(v, 'YYYY-MM-DD', true)
        if (fs.continuationCourse !== 'yes') {
            // not relevant as the course is not a continuation
          return true
        }

        if (contOriginalDateMom.isBefore(start)) {
          return true
        }

        return { summary: 'The "Original course start date" is invalid', msg: 'Enter a valid "Original course start date"' }
      }
    },
    tuitionFees: {
      prefix: '£ ',
      errors: {
        required: {
          summary: 'The "Total tuition fees" is invalid',
          msg: 'Enter a valid "Total tuition fees"'
        },
        numeric: {
          summary: 'The "Total tuition fees" is invalid',
          msg: 'Enter a valid "Total tuition fees"'
        }
      }
    },
    tuitionFeesPaid: {
      prefix: '£ ',
      errors: {
        required: {
          summary: 'The "Tuition fees already paid" is invalid',
          msg: 'Enter a valid "Tuition fees already paid"'
        },
        numeric: {
          summary: 'The "Tuition fees already paid" is invalid',
          msg: 'Enter a valid "Tuition fees already paid"'
        }
      }
    },
    accommodationFeesPaid: {
      prefix: '£ ',
      errors: {
        required: {
          summary: 'The "Accommodation fees already paid" is invalid',
          msg: 'Enter a valid "Accommodation fees already paid"'
        },
        numeric: {
          summary: 'The "Accommodation fees already paid" is invalid',
          msg: 'Enter a valid "Accommodation fees already paid"'
        }
      }
    },
    dependants: {
      classes: { 'form-control-1-8': true },
      validate: function (v, s) {
        var ok = true
        var n = Number(v)
        if (n < 0 || n > 99) {
          ok = false
        }

        if (v && v.length === 0) {
          ok = false
        }

        if (Math.ceil(n) !== Math.floor(n)) {
          ok = false
        }

        if (fs.dependantsOnly && n < 1) {
          ok = false
        }

        if (ok) {
          return true
        }

        return {
          summary: 'The "Number of dependants" is invalid',
          msg: 'Enter a valid "Number of dependants"'
        }
      }
    }
  }

  // set all fields to hidden
  _.each($scope.conf, function (f) {
    f.hidden = true
  })

  // the fields listed as required for this route should NOT be hidden
  _.each($scope.fields, function (f) {
    $scope.conf[f].hidden = false
  })

  $scope.submit = function (valid) {
    console.log('SUBMIT')
    if (valid) {
      var doThresholdStuff = function () {
        FsService.clearThresholdResponse(fs)
        FsService.sendThresholdRequest(fs).then(function (data) {
          data.responseTime = moment()
          fs.thresholdResponse = data
          $state.go('fsResult', $state.params)
        }, function (err, data) {
          $state.go('fsError', $state.params)
        })
      }

      if (fs.tier === 4) {
        FsService.clearConditionCode(fs)
        FsService.sendConditionCodeRequest(fs).then(function (data) {
          fs.conditionCodeResponse = data
          doThresholdStuff()
        }, function (err, data) {
          doThresholdStuff()
        })
      } else {
        doThresholdStuff()
      }
    }
  }
}])
