
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Modal} from 'react-bootstrap'

let BoardItemModel = require('models/BoardItemModel.jsx')

let ItemDelete = createReactClass({
  mixins: [PureRenderMixin],
  propTypes: {
    alert: PropTypes.func.isRequired,
    BoardModel: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  },
  getInitialState() {
    let boardId = window.CONSTS.board_id

    let boardItemModel = new BoardItemModel()
    boardItemModel.prepareAjax(boardId)

    return {
      BoardItemModel: boardItemModel,
      show: false,
    }
  },
  show() {
    this.setState({
      show: true,
    })
  },
  confirm() {
    this.state.BoardItemModel.deleteModel(this.props.item).then(() => {
      this.props.BoardModel.refreshModel()
      this.props.alert('Coin deleted')
    })

    this.hide()
  },
  hide() {
    this.setState({
      show: false,
    })
  },
  render() {
    return (
      <div>
        <Modal
          bsSize="small"
          className="modal inmodal"
          show={this.state.show}
          onHide={this.hide}
        >
          <Modal.Header>
            <h4 className="modal-title">
              Delete Coin
            </h4>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this coin?
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
              onClick={this.confirm}
              type="submit"
            >
              Delete Coin
            </button>
          </Modal.Footer>
        </Modal>
        <button
          className="btn btn-danger btn-xs btn-delete"
          onClick={this.show}
        >
          Delete
        </button>
      </div>
    )
  },
})

module.exports = ItemDelete
