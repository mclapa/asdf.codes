
let sessionStorage = window.sessionStorage

import $ from 'jquery'
import _ from 'lodash'
import NProgress from 'react-nprogress'

let Env = require('environment/Env.jsx')

export function xhr(method, url, data = {}, fail = null, multipart = false) {
  let deferred = new $.Deferred()

  let status = {
    data: {},
    message: '',
    success: false,
    status: 0,
  }

  let options = {
    method: method,
    url: this.xhrUrl(url),
    data: data,
    cache: false,
    traditional: true,
    contentType: 'application/json',
  }

  if (method !== 'GET' && !multipart) {
    options['data'] = JSON.stringify(data)
  }

  // lets try to stop too many ajax calls at once
  if (window.activeAjax.indexOf(url) !== -1) {
    return deferred.fail()
  } else {
    window.activeAjax.push(url)
  }

  NProgress.start()

  // if multipart (with image) then different params
  if (multipart) {
    options['contentType'] = false
    options['processData'] = false
  }

  $.ajax(options).done((returnData) => {
    if (returnData && 'data' in returnData) { // must be a success
      status['success'] = true

      // in case the results we get back is just a list
      if (Array.isArray(returnData.data)) {
        status['data'] = {
          results: returnData.data,
        }

        if (returnData.meta) {
          status['data']['pagination'] = returnData.meta.pagination
        }
      } else {
        status['data'] = returnData.data
      }
    } else if (returnData) {  // otherwise must be a fail
      status['success'] = false
      status['data'] = returnData.responseJSON
    }

    deferred.resolve(status)
    NProgress.done()
  }).fail((returnData) => {
    status['success'] = false
    status['data']['message'] = returnData.responseJSON.message
    status['data']['errors'] = returnData.responseJSON.errors
    status['status'] = returnData.status

    deferred.resolve(status)
    NProgress.done()
  }).always(() => {
    // first remove this call from the list of active ajax calls
    _.pull(window.activeAjax, url)

    // if we're done all active ajax calls, lets broadcast it
    if (window.activeAjax.length === 0) {
      window.globalEmitter.emit('doneall')
    }
  })

  return deferred.promise()
}

export function xhrUrl(url) {
  return `${Env.ajaxBase}${url}`
}
