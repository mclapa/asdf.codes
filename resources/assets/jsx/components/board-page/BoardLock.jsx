
import React from 'react'
import PropTypes from 'prop-types'

let createReactClass = require('create-react-class')

let ChangeEventMixin = require('mixins/MakeChangeEventMixin.jsx')
let Xhr = require('functions/Xhr.jsx')

let BoardModel = require('models/BoardModel.jsx')
let SessionModel = require('models/SessionModel.jsx')

let BoardLock = createReactClass({
  mixins: [
    ChangeEventMixin.makeChangeEventMixin(window.globalEmitter),
  ],
  propTypes: {
    alert: PropTypes.func.isRequired,
    alertWarning: PropTypes.func.isRequired,
  },
  ajaxLock: '/board-lock',
  ajaxUnlock: '/board-unlock',
  getInitialState() {
    let boardId = window.CONSTS.board_id

    let boardModel = new BoardModel()
    boardModel.prepareInit(boardId)

    let newSessionModel = new SessionModel()
    newSessionModel.populateModel(newSessionModel)

    return {
      BoardModel: boardModel,
      is_locked: true,
      SessionModel: newSessionModel,
    }
  },
  promptLock() {
    let prompt = window.prompt('Enter new key  ( . Y . )')

    if (prompt) {
      let toSubmit = {
        lock_code: prompt,
      }

      Xhr.xhr(
        'POST',
        `${this.ajaxLock}/${this.state.BoardModel.model.id}`,
        toSubmit
      ).then((xhrReturn) => {
        if (!xhrReturn.success) {
          this.extractErrors(xhrReturn.data)
        } else {
          if (xhrReturn.data.success) {
            this.props.alert('LoCk Downnn!!NN!N!')
            this.state.SessionModel.addAccess(this.state.BoardModel.model.id, xhrReturn.data.lock_code)

            location.reload()
          } else {
            this.props.alertWarning('Already locked, gawd')
          }
        }
      })
    }
  },
  promptUnlock() {
    let prompt = window.prompt('Unlocking key ( +_+ )')

    if (prompt) {
      let toSubmit = {
        lock_code: prompt,
      }

      Xhr.xhr(
        'POST',
        `${this.ajaxUnlock}/${this.state.BoardModel.model.id}`,
        toSubmit
      ).then((xhrReturn) => {
        if (!xhrReturn.success) {
          this.extractErrors(xhrReturn.data)
        } else {
          if (xhrReturn.data.success) {
            this.props.alert('You hacker, unlocked!')
            this.state.SessionModel.addAccess(this.state.BoardModel.model.id, xhrReturn.data.lock_code)

            this.state.BoardModel.refreshModel()
            location.reload()
          } else {
            this.props.alertWarning('AXXESS DENIED')
          }

          this.state.BoardModel.refreshModel()
        }
      })
    }
  },
  render() {
    return (
      <div className="help-block">
        {this.state.BoardModel.model.lock_code ? (
          <div>
            {!this.state.SessionModel.hasAccess(this.state.BoardModel.model.id) ? (
              <button
                className="btn btn-danger"
                onClick={this.promptUnlock}
              >
                Unlock
              </button>
            ) : (
              <button
                className="btn btn-warning"
                disabled
              >
                Unlocked
              </button>
            )}
          </div>
        ) : (
          <button
            className="btn btn-success"
            onClick={this.promptLock}
          >
            Lock
          </button>
        )}

      </div>
    )
  },
})

module.exports = BoardLock
