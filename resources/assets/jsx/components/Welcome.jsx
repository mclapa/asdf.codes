
import React from 'react'
import { Redirect } from 'react-router-dom'

let createReactClass = require('create-react-class')

let Form = require('mixins/FormMixin.jsx')
let Strings = require('functions/Strings.jsx')

let Welcome = createReactClass({
  mixins: [Form.formMixin()],
  getInitialState() {
    let formData = this.initFormData([
      'board',
    ])

    return {
      formData: formData,
      redirectTo: null,
    }
  },
  formSubmit(e) {
    e.preventDefault()

    let toSubmit = this.extractForm(this)

    let board = Strings.slugify(toSubmit.board)

    window.location = board
  },
  render() {
    let { redirectTo } = this.state

    if (redirectTo) {
      return (
        <Redirect
          to={redirectTo}
        />
      )
    }

    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Asdf.codes</a>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="container text-center">
            <form
              className="form-inline"
              onSubmit={this.formSubmit}
            >
              <div className="form-group">
                <label htmlFor="cabinet">Board</label>{' '}
                <input
                  type="text"
                  className="form-control"
                  maxLength="50"
                  name="board"
                  onChange={this.handleFieldChange}
                  placeholder="Board Name"
                  ref="board"
                  value={this.state.formData.board.value}
                  required
                />
              </div>{' '}
              <button type="submit" className="btn btn-default">Go 8==|)</button>
            </form>
          </div>
        </div>
      </div>
    )
  },
})

module.exports = Welcome
