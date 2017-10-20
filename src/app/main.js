/* global angular moment */

var app = angular.module('hod.proving', [
  'ui.router',
  'ngAria',
  'hod.fs',
  'hod.io',
  'hod.forms'
])

app.constant('CONFIG', {
  api: '/pttg/financialstatus/v1/',
  timeout: 5000
})

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/fs/t4')
}])

app.filter('pounds', ['$filter', function ($filter) {
  return function (num) {
    return $filter('currency')(num, '£', 2)
  }
}])

app.filter('dateDisplay', function () {
  return function (date) {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }
})

app.run(['$location', '$rootScope', '$window', '$timeout', '$rootElement', function ($location, $rootScope, $window, $timeout, $rootElement) {
  // see http://simplyaccessible.com/article/spangular-accessibility/

  var focusOnH1 = function () {
    // http://stackoverflow.com/questions/25596399/set-element-focus-in-angular-way
    // http://www.accessiq.org/news/features/2013/03/aria-and-accessibility-adding-focus-to-any-html-element
    $timeout(function () {
      var e = angular.element(document.querySelector('h1'))
      if (e[0]) {
        e[0].focus()
      }
    })
  }

  $rootScope.$on('focusOnH1', function (e) {
    focusOnH1()
  })

  $rootScope.$on('$viewContentLoaded', function (e) {
    focusOnH1()
  })
}])
