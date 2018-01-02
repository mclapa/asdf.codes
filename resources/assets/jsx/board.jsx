
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

window.React = React // export for http://fb.me/react-devtools

var {EventEmitter} = require('fbemitter')
window.globalEmitter = new EventEmitter()

// prevent too many of the same ajax
window.activeAjax = []

let App = require('App.jsx')

let BoardPage = require('components/BoardPage.jsx')

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <HashRouter>
    <App>
      <Route component={hashLinkScroll} />
      <Route component={BoardPage} />
    </App>
  </HashRouter>, root)

// https://github.com/reactjs/react-router/issues/394
function hashLinkScroll() {
  const { hash } = window.location

  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#/', '')

      if (id !== '') {
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView(true)
        } else {
          document.body.scrollIntoView(true)
        }
      } else {
        document.body.scrollIntoView(true)
      }
    }, 0)
  }

  return null
}
