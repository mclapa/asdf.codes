
import _ from 'lodash'

let BaseModel = require('models/BaseModel.jsx')

class BoardItemModel extends BaseModel {
  constructor() {
    super()

    // init class variables ( better way? )
    this.baseModel = {
      results: [],
      pagination: {
        current_page: 0,
        last_page: 0,
        total_pages: 0,
      },
    }

    // params we might want to use for pagination
    this.ajaxParams = {
      page: 1,
      per_page: 50,
      column: null,
      direction: null,
      with_trashed: 0,
    }

    // init the model
    this.model = _.cloneDeep(this.baseModel)
    // whether we want it to fetch ajax data or not
    this.ajax = '/boards/$/board-item'
    // the name of this model
    this.modelName = 'BoardModel'

    this.useLocalStorage = false
  }

  prepareInit(boardId, data = {}) {
    this.ajaxParams = _.extend(this.ajaxParams, data)
    this.ajax = this.ajax.replace('$', boardId)
    this.populateModel(this)
  }
}

module.exports = BoardItemModel

