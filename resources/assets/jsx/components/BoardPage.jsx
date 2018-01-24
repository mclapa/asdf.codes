
import React from 'react'

let createReactClass = require('create-react-class')

let AlertMixin = require('mixins/AlertMixin.jsx')
let ChangeEventMixin = require('mixins/MakeChangeEventMixin.jsx')
let Form = require('mixins/FormMixin.jsx')
let Xhr = require('functions/Xhr.jsx')

let BoardItemModel = require('models/BoardItemModel.jsx')

let BoardPage = createReactClass({
  mixins: [
    Form.formMixin(),
    AlertMixin.alertMixin(),
    ChangeEventMixin.makeChangeEventMixin(window.globalEmitter),
  ],
  getInitialState() {
    let formData = this.initFormData([
      'name',
      'public_key',
    ])

    let boardId = window.CONSTS.board_id

    let boardItemModel = new BoardItemModel()
    boardItemModel.prepareInit(boardId)

    return {
      BoardItemModel: boardItemModel,
      formData: formData,
    }
  },
  formSubmit(e) {
    e.preventDefault()

    let toSubmit = {}
    let formData = this.state.formData

    toSubmit = this.extractForm(this)

    formData = this.clearErrors(formData)

    this.setState({
      isSubmitting: true,
      formData: formData,
    })

    Xhr.xhr(
      'POST',
      `${this.state.BoardItemModel.ajax}`,
      toSubmit
    ).then((xhrReturn) => {
      if (!xhrReturn.success) {
        this.extractErrors(xhrReturn.data)
      } else {
        this.alert('Added asdf')
        this.reInitFormData()
      }
    })
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
            <div className="col-sm-4 col-sm-offset-3">
              <form
                onSubmit={this.formSubmit}
              >
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Coin</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength="50"
                    name="name"
                    onChange={this.handleFieldChange}
                    placeholder="Coin Name"
                    ref="name"
                    value={this.state.formData.name.value}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Key</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength="50"
                    name="public_key"
                    onChange={this.handleFieldChange}
                    placeholder="Key"
                    ref="public_key"
                    value={this.state.formData.public_key.value}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputFile">.bat File</label>
                  <input type="file" id="exampleInputFile" />
                  <p className="help-block">Don't put anything personal in here</p>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary pull-right"
                  disabled={this.state.isSubmitting}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {this.state.formData.form.message ? (
                <div className="alert alert-danger">
                  {this.state.formData.form.message}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  },
})

module.exports = BoardPage
