
import React from 'react'

let createReactClass = require('create-react-class')

let BoardAddItem = require('./BoardAddItem.jsx')
let BoardItemList = require('./BoardItemList.jsx')

let AlertMixin = require('mixins/AlertMixin.jsx')

let BoardPage = createReactClass({
  mixins: [
    AlertMixin.alertMixin(),
  ],
  getInitialState() {
    return {}
  },
  render() {
    return (
      <div>
        {this.renderAlertContainer()}
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Asdf.codes</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav pull-right">
                <li>
                  <a
                    href="#"
                    className="text-success"
                  >
                    Unlock
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container text-left">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-4">
              <BoardAddItem
                alert={this.alert}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-6 col-sm-offset-4">
              <BoardItemList
                alert={this.alert}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
})

module.exports = BoardPage
