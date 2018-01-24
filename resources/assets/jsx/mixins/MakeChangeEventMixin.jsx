
import $ from 'jquery'
import _ from 'lodash'

let ChangeEvent = {
  makeChangeEventMixin(emitter) {
    return {
      _isMounted: false,
      componentDidMount: function() {
        this._isMounted = true
        emitter.addListener('change', this.__makeChangeEventMixin_handler_)
      },
      componentWillUnmount: function() {
        try {
          emitter.removeListener('change', this.__makeChangeEventMixin_handler_)
        } catch (e) {}

        this._isMounted = false
      },
      __makeChangeEventMixin_handler_: function(payload) {
        // console.log('Event RECEIVED $this:', this, ' payload: ', payload)
        // this.state is the current state of the component that loaded this mixin
        let currentState = this.state

        // we are passing around a model that we will later set as state for the component
        // first lets populate it
        payload.model.set(payload.value)

        // assign the new state
        currentState[payload.model.modelName] = payload.model

        // set the state, should cause re-render and update the data
        if (this._isMounted) {
          this.setState(currentState)
        }
      },
    }
  },
}

module.exports = ChangeEvent
