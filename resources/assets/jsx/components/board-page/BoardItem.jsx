
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

let createReactClass = require('create-react-class')

let Assets = require('functions/Assets.jsx')
let Form = require('mixins/FormMixin.jsx')

let SessionModel = require('models/SessionModel.jsx')

let ItemDelete = require('./ItemDelete.jsx')
let ItemEdit = require('./ItemEdit.jsx')

let BoardItem = createReactClass({
  mixins: [
    Form.formMixin(),
  ],
  propTypes: {
    alert: PropTypes.func.isRequired,
    BoardModel: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  },
  getInitialState() {
    let boardId = window.CONSTS.board_id

    let newSessionModel = new SessionModel()
    newSessionModel.populateModel(newSessionModel)

    return {
      SessionModel: newSessionModel,
    }
  },
  render() {
    let canEdit = true
    let canDelete = true

    if (this.props.BoardModel.model.lock_code) {
      if (!this.state.SessionModel.hasAccess(this.props.BoardModel.model.id)) {
        canEdit = false
        canDelete = false
      }
    }

    return (
      <li className="list-group-item">

        {canDelete ? (
          <ItemDelete
            alert={this.props.alert}
            BoardModel={this.props.BoardModel}
            item={this.props.item}
          />
        ) : null}
        <h3>
          {this.props.item.name}{' '}
          {canEdit ? (
            <ItemEdit
              alert={this.props.alert}
              BoardModel={this.props.BoardModel}
              item={this.props.item}
            />
          ) : null}
        </h3>
        <div className="form-horizontal">
          {this.props.item.public_key ? (
            <div className="form-group">
              <label className="col-sm-4 control-label">Public Key</label>
              <div className="col-sm-8">
                <p className="form-control-static">{this.props.item.public_key}</p>
              </div>
            </div>
          ) : null}
          {this.props.item.receiving_address ? (
            <div className="form-group">
              <label className="col-sm-4 control-label">Receiving Address</label>
              <div className="col-sm-8">
                <p className="form-control-static">{this.props.item.receiving_address}</p>
              </div>
            </div>
          ) : null}
          {!_.isEmpty(this.props.item.media) ? (
            <div className="form-group">
              <label className="col-sm-4 control-label">File</label>
              <div className="col-sm-8">
                <p className="form-control-static">
                  <a
                    href={Assets.media(this.props.item.media.filename)}
                    download
                  >
                    {this.props.item.media.original_filename}
                  </a>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </li>
    )
  },
})

module.exports = BoardItem
