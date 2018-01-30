
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

let createReactClass = require('create-react-class')

let ChangeEventMixin = require('mixins/MakeChangeEventMixin.jsx')
let Form = require('mixins/FormMixin.jsx')

let BoardModel = require('models/BoardModel.jsx')

let BoardItem = require('./BoardItem.jsx')

let BoardItemList = createReactClass({
  mixins: [
    Form.formMixin(),
    ChangeEventMixin.makeChangeEventMixin(window.globalEmitter),
  ],
  propTypes: {
    alert: PropTypes.func.isRequired,
  },
  getInitialState() {
    let boardId = window.CONSTS.board_id

    let boardModel = new BoardModel()
    boardModel.prepareInit(boardId)

    return {
      BoardModel: boardModel,
    }
  },
  generateData(data) {
    let toReturn = []

    if (_.isEmpty(data)) {
      toReturn.push(
        <div
          key="no-coins"
        >
          No Coins Saved
        </div>
      )
    } else {
      data.map((v, k) => {
        toReturn.push(
          <BoardItem
            key={`fu-${v.id}`}
            alert={this.props.alert}
            BoardModel={this.state.BoardModel}
            item={v}
          />
        )
      })
    }

    return toReturn
  },
  render() {
    let generatedData = this.generateData(this.state.BoardModel.model.board_items)

    return (
      <ul className="list-group">
        {generatedData}
      </ul>
    )
  },
})

module.exports = BoardItemList
