
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import createReactClass from 'create-react-class'

let App = createReactClass({
  mixins: [],
  getInitialState() {
    return {
    }
  },
  render() {
    return (
      <div>eatrgetrg
        {this.props.children}
      </div>
    )
  },
})

module.exports = App
