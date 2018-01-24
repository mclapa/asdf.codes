
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

let createReactClass = require('create-react-class')

let ChangeEventMixin = require('mixins/MakeChangeEventMixin.jsx')
let Form = require('mixins/FormMixin.jsx')

let BoardItemModel = require('models/BoardItemModel.jsx')

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

    let boardItemModel = new BoardItemModel()
    boardItemModel.prepareInit(boardId)

    return {
      BoardItemModel: boardItemModel,

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
            item={v}
          />
        )
      })
    }

    return toReturn
  },
  render() {
    let generatedData = this.generateData(this.state.BoardItemModel.model.results)

    return (
      <ul className="list-group">
        {generatedData}
      </ul>
    )
  },
})

module.exports = BoardItemList
