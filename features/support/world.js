// require OUR APPLICATION THAT WE'RE TESTING
require('../../server.js')
//

require('chromedriver')

var mockdata = require('../step_definitions/mockdata')

var seleniumWebdriver = require('selenium-webdriver')
var chrome = require('selenium-webdriver/chrome')
var {defineSupportCode} = require('cucumber')
var globalDriver
var path = require('path')

// config
var shareBrowserInstances = true
var browserName = 'chrome'// usePhantomJS ? 'phantomjs' : 'chrome'
var headless = (process.env.HEADLESS !== false && process.env.HEADLESS !== 'false')
//

var getNewBrowser = function (name) {
  var builder = new seleniumWebdriver.Builder()
  var opts = new chrome.Options()
  if (headless) {
    opts.addArguments(['headless', 'no-sandbox'])
  }
  opts.addArguments('disable-extensions')
  // opts.setChromeBinaryPath('/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary')
  builder.setChromeOptions(opts)

  var forBrowser = builder.forBrowser(name)

  var driver = forBrowser.build()
  // driver.manage().window().setSize(1280, 1024)
  return driver
}

if (shareBrowserInstances) {
  globalDriver = getNewBrowser(browserName)
}

function CustomWorld (done) {
  mockdata.clearAll()
  this.seleniumWebdriver = seleniumWebdriver
  this.driver = shareBrowserInstances ? globalDriver : getNewBrowser(browserName)
  this.defaults = {
    applicationRaisedDate: '29/06/2016',
    endDate: '30/05/2016',
    inLondon: 'Yes',
    accommodationFeesPaid: '0',
    dependants: '1',
    continuationCourse: 'No',
    courseType: 'main',
    courseInstitution: 'recognised'
  }
  this.driver.get('http://127.0.0.1:5000/#!/fs/').then(done)
}

defineSupportCode(function ({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})

defineSupportCode(function ({registerHandler}) {
  registerHandler('AfterFeatures', function (features, callback) {
    callback()
  })
})
