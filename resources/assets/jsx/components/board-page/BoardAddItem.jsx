
import React from 'react'
import PropTypes from 'prop-types'

let createReactClass = require('create-react-class')

let ChangeEventMixin = require('mixins/MakeChangeEventMixin.jsx')
let Form = require('mixins/FormMixin.jsx')
let Xhr = require('functions/Xhr.jsx')

let BoardItemModel = require('models/BoardItemModel.jsx')

let MediaAdd = require('components/MediaAdd.jsx')

let BoardItemPage = createReactClass({
  mixins: [
    Form.formMixin(),
    ChangeEventMixin.makeChangeEventMixin(window.globalEmitter),
  ],
  propTypes: {
    alert: PropTypes.func.isRequired,
  },
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
        this.props.alert('Added coin')
        this.reInitFormData()
        this.state.BoardItemModel.refreshModel()
      }

      this.setState({
        isSubmitting: false,
      })
    })
  },
  successAddFile(mediaId) {
    console.log(mediaId)
  },
  render() {
    return (
      <div>
        <form
          onSubmit={this.formSubmit}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Coin</label>
            <input
              type="text"
              className="form-control"
              maxLength="255"
              name="name"
              onChange={this.handleFieldChange}
              placeholder="Coin Name"
              ref="name"
              value={this.state.formData.name.value}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Public Key</label>
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
            <MediaAdd
              alert={this.props.alert}
              successAdd={this.successAddFile}
            />
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
    )
  },
})

module.exports = BoardItemPage
