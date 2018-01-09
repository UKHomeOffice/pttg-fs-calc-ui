var jswiremocklib = require('../support/jswiremock')
var Jswiremock = jswiremocklib.jswiremock
var stubFor = jswiremocklib.stubFor
var get = jswiremocklib.get
// var post = jswiremocklib.post
var urlEqualTo = jswiremocklib.urlEqualTo
var aResponse = jswiremocklib.a_response
var fs = require('fs')

exports = module.exports = {
  jswm: new Jswiremock(8050),
  stubHealthz: function (code) {
    var res = aResponse()
    res.withStatus(code)
    res.withHeader({'Content-Type': 'application/json'})
    res.withBody(JSON.stringify({'status': 'success'}))
    stubFor(this.jswm, get(urlEqualTo('/healthz')).willReturn(res))
  },

  stubIt: function (u, data, status, delay) {
    var res = aResponse()
    res.withDelay(delay || 0)
    res.withStatus(status || 200)
    res.withHeader({'Content-Type': 'application/json'})
    res.withBody(JSON.stringify(data))
    stubFor(this.jswm, get(urlEqualTo(u)).willReturn(res))
  },

  stubItFile: function (u, file, status, delay) {
    var res = aResponse()
    res.withDelay(delay || 0)
    res.withStatus(status || 200)
    res.withHeader({'Content-Type': 'application/json'})
    if (file) {
      // console.log('stubItFile', u, file)
      res.withBody(fs.readFileSync('features/test-data/' + file, 'utf8'))
    } else {
      // console.log('FILE NOT DEFINED')
    }
    stubFor(this.jswm, get(urlEqualTo(u)).willReturn(res))
  },

  clearAll: function () {
    this.jswm.clearAll()
  }
}
