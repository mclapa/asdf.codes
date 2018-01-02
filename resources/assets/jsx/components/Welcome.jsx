
import React from 'react'

let createReactClass = require('create-react-class')

let Welcome = createReactClass({
  mixins: [],
  getInitialState() {
    return {}
  },
  render() {
    return (
      <div>
        <div className="container-fluid cont">
        El is a douche
        </div>
      </div>
    )
  },
})

module.exports = Welcome
