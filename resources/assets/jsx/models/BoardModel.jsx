
import _ from 'lodash'

let BaseModel = require('models/BaseModel.jsx')

class BoardModel extends BaseModel {
  constructor() {
    super()

    // init class variables ( better way? )
    this.baseModel = {
      is_locked: '',
      id: 0,
      slug: '',
      board_items: [],
      lock_code: '',
    }

    // params we might want to use for pagination
    this.ajaxParams = {
    }

    // init the model
    this.model = _.cloneDeep(this.baseModel)
    // whether we want it to fetch ajax data or not
    this.ajax = '/board/$'
    // the name of this model
    this.modelName = 'BoardModel'

    this.useLocalStorage = false
  }

  prepareInit(boardId, data = {}) {
    this.prepareAjax(boardId, data)

    this.populateModel(this)
  }

  prepareAjax(boardId, data = {}) {
    this.ajaxParams = _.extend(this.ajaxParams, data)
    this.ajax = this.ajax.replace('$', boardId)
  }
}

module.exports = BoardModel

