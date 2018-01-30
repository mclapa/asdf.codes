
import _ from 'lodash'

let BaseModel = require('models/BaseModel.jsx')

class SessionModel extends BaseModel {
  constructor() {
    super()

    // init class variables ( better way? )
    this.baseModel = {
      unlocked: [],
    }

    // init the model
    this.model = _.cloneDeep(this.baseModel)
    // whether we want it to fetch ajax data or not
    // this.ajax = '/session'
    // the name of this model
    this.modelName = 'SessionModel'
    // logout URL
    this.ajaxLogout = '/logout'

    this.useLocalStorage = true
  }

  hasAccess(boardId) {
    if (!_.isEmpty(this.model.unlocked)) {
      if (_.find(this.model.unlocked, {board_id: boardId})) {
        return true
      }
    }

    return false
  }

  addAccess(boardId, code) {
    let unlocked = this.model.unlocked

    unlocked.push({
      'board_id': boardId,
      'code': code,
    })

    this.set({
      unlocked: unlocked,
    })
  }

  getUnlockCode(boardId) {
    let toReturn = null

    if (!_.isEmpty(this.model.unlocked)) {
      let search = _.find(this.model.unlocked, {board_id: boardId})

      if (!_.isEmpty(search)) {
        toReturn = search.code
      }
    }

    return toReturn
  }
}

module.exports = SessionModel
