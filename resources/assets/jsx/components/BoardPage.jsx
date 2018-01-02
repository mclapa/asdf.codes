
import React from 'react'

let createReactClass = require('create-react-class')

let BoardPage = createReactClass({
  mixins: [],
  getInitialState() {
    return {}
  },
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Asdf.codes</a>
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
        <div className="container-fluid">
          <div className="container text-center">
            <form className="form-inline">
              <div className="form-group">
                <label htmlFor="cabinet">Board</label>{' '}
                <input type="text" className="form-control" id="cabinet" placeholder="Board Name" />
              </div>{' '}
              <button type="submit" className="btn btn-default">Go 8==|)</button>
            </form>
          </div>
        </div>
      </div>
    )
  },
})

module.exports = BoardPage
