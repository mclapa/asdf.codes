
import _ from 'lodash'
import $ from 'jquery'

let Xhr = require('functions/Xhr.jsx')

let sessionStorage = window.sessionStorage

class BaseModel {
  constructor() {
    // init class variables ( better way? )
    this.baseModel = {}

    // init the model
    this.model = _.cloneDeep(this.baseModel)
    // whether we want it to fetch ajax data or not
    this.ajax = null
    // any params we want to send in
    this.ajaxParams = null
    // the name of the model which will be used throughout
    this.modelName = null
  }

  // populate the model by check the sessionStorage or fetch / save it
  // via ajax if set
  populateModel(modelChild, data = {}) {
    // lets try to get it from browser storage first
    let sessionStorageModel = sessionStorage.getObject(this.modelName)


    // if it's not in browser, lets get it and set it
    if (!this.useLocalStorage || (_.isEmpty(sessionStorageModel) || !sessionStorageModel.id)) {
      // if theres any ajax params, get em ready
      if (this.ajaxParams) {
        data = _.clone(_.assign(this.ajaxParams, data))
      }

      _.forEach(data, (v, k) => {
        if (_.isArray(v)) {
          data[k] = JSON.stringify(v)
        }
      })

      return Xhr.xhr(
        'GET',
        `${this.ajax}`,
        data
      ).done((xhrReturn) => {
        if (xhrReturn.success) {
          window.globalEmitter.emit('change', {
            model: modelChild,
            value: xhrReturn.data,
          })
        } else {
          // unauthorized
          if (xhrReturn.status === 401) {
            window.globalEmitter.emit('expiredsession', {
              model: modelChild,
              value: this.baseModel,
            })
          // model not found
          } else if (xhrReturn.status === 422) {
            window.globalEmitter.emit('change', {
              model: modelChild,
              value: {
                'exists': false,
              },
            })
          }
        }

        return xhrReturn
      })
    } else {
      // it exists in storage so lets just retrieve and save it
      this.model = sessionStorageModel
    }
  }

  saveStorage() {
    // lets try to get it from browser storage first
    let sessionStorageModel = sessionStorage.getObject(this.modelName)

    // only try to use local storage if set in model (child model that is)
    if (this.useLocalStorage) {
      // make sure theres no value, we always must destroy first
      if (_.isEmpty(sessionStorageModel) || !sessionStorageModel.id) {
        sessionStorage.setObject(this.modelName, this.model)
      }
    }
  }

  destroyStorage() {
    sessionStorage.removeItem(this.modelName)
  }

  // only set key value paris that are originally defined in this model
  set(value) {
    let self = this

    // go through every item attempting to be saved and compare it to our currently
    // populated model. Only replace those items that need replacing rather than
    // the entire object
    function recurse(initial, update) {
      for (var prop in initial) {
        if ({}.hasOwnProperty.call(initial, prop) &&
          (update !== null && {}.hasOwnProperty.call(update, prop))
        ) {
          if (typeof initial[prop] === 'object' &&
              (
                initial[prop] !== null &&
                initial[prop].constructor !== Array
              ) &&
              (
                typeof update[prop] === 'object' &&
                update[prop] !== null
              )
            ) {
            recurse(initial[prop], update[prop])
          } else if (update[prop] === null) {
            initial[prop] = self.baseModel[prop]
          } else {
            initial[prop] = update[prop]
          }
        }
      }

      return initial
    }

    this.model = recurse(this.model, value)

    // save to local storage
    this.saveStorage()
  }

  destroy(eventDeffered) {
    this.model = _.cloneDeep(this.baseModel)

    this.destroyStorage()

    eventDeffered.resolve()
  }

  refreshModel() {
    let deferred = new $.Deferred()
    this.destroy(deferred)

    return deferred.then(this.populateModel(this))
  }

  // if we want to see whether the model was properly pulled from local storage or xhr
  // by comparing the base model to the current model's value
  wasModelUpdated() {
    return !_.isEqual(this.baseModel, this.model)
  }

  deleteModel(model, data = null) {
    return Xhr.xhr(
      'DELETE',
      `${this.ajax}/${model.id}`,
      data
    ).done((xhrReturn) => {
      if (xhrReturn.success) {
        this.refreshModel()
      }
    })
  }

  exists() {
    return this.model.exists
  }

  dateRange(startDate, endDate) {
    this.ajaxParams.date_start = startDate
    this.ajaxParams.date_end = endDate

    this.ajaxParams.page = 1

    this.refreshModel()
  }

  filterBy(key, value) {
    this.ajaxParams.filter_by = key
    this.ajaxParams.filter_value = value

    this.ajaxParams.page = 1

    this.refreshModel()
  }

  searchBy(key, value) {
    this.ajaxParams.search_by = key
    this.ajaxParams.search_value = value

    this.ajaxParams.page = 1

    this.refreshModel()
  }

  setPage(page) {
    this.ajaxParams['page'] = page
    this.refreshModel()
  }

  setPerPage(page) {
    this.ajaxParams['per_page'] = page
    this.refreshModel()
  }

  sortBy(column, direction) {
    this.ajaxParams.column = column
    this.ajaxParams.direction = direction

    this.refreshModel()
  }
}

module.exports = BaseModel

