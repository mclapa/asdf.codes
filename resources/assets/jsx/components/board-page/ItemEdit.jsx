
import React from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'react-bootstrap'

let createReactClass = require('create-react-class')

let Form = require('mixins/FormMixin.jsx')
let Xhr = require('functions/Xhr.jsx')

let BoardItemModel = require('models/BoardItemModel.jsx')

let ItemEdit = createReactClass({
  mixins: [
    Form.formMixin(),
  ],
  propTypes: {
    alert: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  },
  getInitialState() {
    let formData = this.initFormData([
      'name',
      'public_key',
    ])

    formData.name.value = this.props.item.name
    formData.public_key.value = this.props.item.public_key

    let boardId = window.CONSTS.board_id

    let boardItemModel = new BoardItemModel()
    boardItemModel.prepareAjax(boardId)

    return {
      BoardItemModel: boardItemModel,
      formData: formData,
      isSubmitting: false,
      show: false,
    }
  },
  hide() {
    this.setState({
      show: false,
    })
  },
  show() {
    this.setState({
      show: true,
    })
  },
  formSubmit(e) {
    e.preventDefault()

    let toSubmit = this.extractForm(this)

    let formData = this.clearErrors(formData)

    this.setState({
      isSubmitting: true,
      formData: formData,
    })

    Xhr.xhr(
      'PUT',
      `${this.state.BoardItemModel.ajax}/${this.props.item.id}`,
      toSubmit
    ).then((xhrReturn) => {
      if (!xhrReturn.success) {
        formData = this.extractErrors(xhrReturn.message)

        this.setState({
          isSubmitting: false,
          formData: formData,
        })
      } else {
        this.props.alert('Coin updated')

        this.state.BoardItemModel.refreshModel()

        this.setState({
          isSubmitting: false,
          show: false,
        })
      }
    })
  },
  render() {
    return (
      <span>
        <Modal
          className="modal inmodal"
          show={this.state.show}
          onHide={this.hide}
        >
          <Modal.Header>
            <h4 className="modal-title">
              Edit Coin
            </h4>
          </Modal.Header>
          <form
            className="form-horizontal"
            onSubmit={this.formSubmit}
          >
            <Modal.Body>
              <div className="form-group">
                <label className="col-sm-3 control-label">Coin</label>
                <div className="col-sm-9">
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
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Public Key</label>
                <div className="col-sm-9">
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
              </div>
              <div className="form-group has-error">
                {this.state.formData.form.message ? (
                  <p className="help-block col-sm-offset-2">
                    {this.state.formData.form.message}
                  </p>
                ) : null}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-default"
                onClick={this.hide}
                type="button"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                disabled={this.state.isSubmitting}
                type="submit"
              >
                Save changes
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        <button
          className="btn btn-warning btn-xs edit-button"
          onClick={this.show}
        >
          Edit
        </button>
      </span>
    )
  },
})

module.exports = ItemEdit
