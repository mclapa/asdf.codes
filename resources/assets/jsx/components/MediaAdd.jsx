
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import classNames from 'classnames'

let Form = require('mixins/FormMixin.jsx')
let Xhr = require('functions/Xhr.jsx')

let MediaAdd = createReactClass({
  mixins: [
    Form.formMixin(),
  ],
  ajaxEdit: '/media',
  propTypes: {
    alert: PropTypes.func.isRequired,
    successAdd: PropTypes.func.isRequired,
  },
  getInitialState() {
    return {
      hasSubmitted: false,
      isSubmitting: false,
      image: {
        file: '',
      },
    }
  },
  selectImage(event) {
    let self = this

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      let file = event.target.files[0]

      this.props.alert('Uploading file ...')

      reader.onload = function(e) {
        self.setState({
          image: {
            file: file,
          },
        })

        self.formSubmit()
      }

      reader.readAsDataURL(file)
    }
  },
  formSubmit() {
    let formData = new FormData()

    formData.append('file', this.state.image.file)

    Xhr.xhr(
      'POST',
      `${this.ajaxEdit}`,
      formData,
      null,
      true
    ).then((xhrReturn) => {
      if (!xhrReturn.success) {
        formData = this.extractErrors(xhrReturn.message)

        this.setState({
          isSubmitting: false,
          formData: formData,
        })
      } else {
        this.props.alert('File uploaded')

        this.setState({
          hasSubmitted: true,
          isSubmitting: false,
        })

        this.props.successAdd(xhrReturn.data.id)
      }
    })
  },
  render() {
    let buttonClassSet = classNames({
      'row bttn': true,
      'loading': this.state.isSubmitting,
      'submit': !this.state.isSubmitting && !this.state.hasSubmitted,
      'complete': this.state.hasSubmitted,
    })

    return (
      <div>
        <div className={buttonClassSet}>
          <div className="col-sm-6 col-md-3 bt-sub">
            <input
              className="btn2"
              type="file"
              accept="image/*;capture=camera"
              onChange={this.selectImage}
            />
          </div>
        </div>
      </div>
    )
  },
})

module.exports = MediaAdd
