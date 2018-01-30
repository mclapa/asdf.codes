
import React from 'react'
import PropTypes from 'prop-types'

let createReactClass = require('create-react-class')

let ChangeEventMixin = require('mixins/MakeChangeEventMixin.jsx')
let Form = require('mixins/FormMixin.jsx')
let Xhr = require('functions/Xhr.jsx')

let BoardModel = require('models/BoardModel.jsx')
let BoardItemModel = require('models/BoardItemModel.jsx')
let SessionModel = require('models/SessionModel.jsx')

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
      'media_id',
      'receiving_address',
    ])

    let boardId = window.CONSTS.board_id

    let boardItemModel = new BoardItemModel()
    boardItemModel.prepareInit(boardId)

    let boardModel = new BoardModel()
    boardModel.prepareInit(boardId)

    let sessionModel = new SessionModel()
    sessionModel.populateModel(sessionModel)

    return {
      BoardItemModel: boardItemModel,
      BoardModel: boardModel,
      formData: formData,
      SessionModel: sessionModel,
    }
  },
  formSubmit(e) {
    e.preventDefault()

    let toSubmit = {}
    let formData = this.state.formData

    toSubmit = this.extractForm(this)

    toSubmit.media_id = this.state.formData.media_id.value

    formData = this.clearErrors(formData)

    this.setState({
      isSubmitting: true,
      formData: formData,
    })

    toSubmit.code = this.state.SessionModel.getUnlockCode(this.state.BoardModel.model.id)

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
        this.state.BoardModel.refreshModel()
      }

      this.setState({
        isSubmitting: false,
      })
    })
  },
  successAddFile(mediaId) {
    let formData = this.state.formData
    formData.media_id.value = mediaId

    this.setState({
      formData: formData,
    })
  },
  render() {
    let canAdd = true

    if (this.state.BoardModel.model.lock_code) {
      if (!this.state.SessionModel.hasAccess(this.state.BoardModel.model.id)) {
        canAdd = false
      }
    }

    return (
      <div>
        {canAdd ? (
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
                <label htmlFor="exampleInputPassword1">Receiving Address</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="50"
                  name="receiving_address"
                  onChange={this.handleFieldChange}
                  placeholder="Receiving Address"
                  ref="receiving_address"
                  value={this.state.formData.receiving_address.value}
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
        ) : null}
      </div>
    )
  },
})

module.exports = BoardItemPage
