
import React from 'react'
import PropTypes from 'prop-types'

let createReactClass = require('create-react-class')

let Form = require('mixins/FormMixin.jsx')

let BoardItemModel = require('models/BoardItemModel.jsx')

let ItemDelete = require('./ItemDelete.jsx')
let ItemEdit = require('./ItemEdit.jsx')

let BoardItem = createReactClass({
  mixins: [
    Form.formMixin(),
  ],
  propTypes: {
    alert: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  },
  getInitialState() {
    let boardId = window.CONSTS.board_id

    let boardItemModel = new BoardItemModel()
    boardItemModel.prepareInit(boardId)

    return {
      BoardItemModel: boardItemModel,

    }
  },
  render() {
    return (
      <li className="list-group-item">
        <ItemDelete
          alert={this.props.alert}
          item={this.props.item}
        />
        <h3>
          {this.props.item.name}{' '}
          <ItemEdit
            alert={this.props.alert}
            item={this.props.item}
          />
        </h3>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-4 control-label">Public Key</label>
            <div className="col-sm-8">
              <p className="form-control-static">{this.props.item.public_key}</p>
            </div>
          </div>
        </div>
      </li>
    )
  },
})

module.exports = BoardItem
