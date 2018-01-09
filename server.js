const express = require('express')
const serveStatic = require('serve-static')
const app = express()
const apiRoot = process.env.API_ROOT || 'http://localhost:8050'
const uiBaseUrl = '/pttg/financialstatus/v1/'
const apiBaseUrl = apiRoot + '/pttg/financialstatus/v1/'
const request = require('request')
const port = process.env.SERVER_PORT || '5000'
const uuid = require('uuid/v4')
const fs = require('fs')

// required when running BDDs to force to root directory
const path = require('path')
process.chdir(path.resolve(__dirname))

const addSecureHeaders = function (res) {
  res.setHeader('Cache-control', 'no-store, no-cache')
}

const stdRelay = (req, res, uri, qs) => {
  let headers = {}

  addSecureHeaders(res)

  if (req.headers['x-auth-userid']) {
    headers['x-auth-userid'] = req.headers['x-auth-userid']
  }

  if (req.headers['kc-access']) {
    headers['kc-access'] = req.headers['kc-access']
  }

  headers['x-correlation-id'] = uuid()

  let opts = {
    uri: uri,
    qs: qs,
    headers: headers
  }
  opts = addCaCertsForHttps(opts, headers)

  // console.log(uri)
  // console.log(qs)

  request(opts, (error, response, body) => {
    let status = (response && response.statusCode) ? response.statusCode : 500
    if ((body === '' || body === '""') && status === 200) {
      status = 500
    }
    res.setHeader('Content-Type', 'application/json')
    res.status(status)
    res.send(body)
    // console.log(body)
    // console.log(status)

    if (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('ERROR: Connection refused', uri)
      } else {
        console.log('ERROR', error)
      }
    }
  })
}

app.use(serveStatic('public/', { 'index': ['index.html'] }))

app.listen(port, () => {
  console.log('The server is running on port:' + port)
  console.log('apiRoot is:' + apiRoot)
})

app.get('/ping', (req, res) => {
  res.send('')
})

app.get('/healthz', (req, res) => {
  res.send({env: process.env.ENV, status: 'OK'})
})

app.get(uiBaseUrl + 'availability', (req, res) => {
  stdRelay(req, res, apiRoot + '/healthz', '')
})

app.get(uiBaseUrl + ':tier/threshold', (req, res) => {
  // res.send({
  //   threshold: '16090.00',
  //   leaveEndDate: '2017-10-22',
  //   cappedValues: {
  //     accommodationFeesPaid: '1265.00',
  //     courseLength: 9
  //   },
  //   status: {
  //     code: '200',
  //     message: 'OK'
  //   }
  // })
  stdRelay(req, res, apiBaseUrl + req.params.tier + '/maintenance/threshold', req.query)
})

app.get(uiBaseUrl + ':tier/conditioncodes', (req, res) => {
  // res.send({ partnerConditionCode: '4B', childConditionCode: '1' })
  stdRelay(req, res, apiBaseUrl + req.params.tier + '/conditioncodes', req.query)
})

function addCaCertsForHttps (opts, headers) {
    // log("About to call " + opts.uri, headers)
  if (opts.uri && opts.uri.toLowerCase().startsWith('https')) {
        // log("Loading certs from  " + process.env.CA_CERTS_PATH, headers)
    opts.ca = fs.readFileSync(process.env.CA_CERTS_PATH, 'utf8')
        // DSP certs do not include root ca - so we can not validate entire chain that OpenSSL requires
        // so until we have entire chain in bundle lets not be strict
    opts.strictSSL = false
  }
  return opts
}
