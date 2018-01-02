
import {findDOMNode} from 'react-dom'
import _ from 'lodash'

let Strings = require('functions/Strings.jsx')

let Form = {
  formMixin() {
    return {
      initFormData(fields) {
        let formData = {}

        fields.map(function(field) {
          formData[field] = {
            message: '',
            value: '',
            modified: false,
          }
        })

        formData['form'] = {
          message: '',
        }

        return formData
      },
      reInitFormData() {
        let formData = this.state.formData

        _.forOwn(formData, function(value, key) {
          value.message = ''
          value.value = ''
          value.modified = false
        })

        return formData
      },
      clearFormData(e) {
        e.preventDefault()

        let formData = this.reInitFormData()

        this.setState({
          formData: formData,
        })
      },
      addFormData(field) {
        let formData = this.state.formData

        formData[field] = {
          message: '',
          value: '',
          modified: false,
        }

        return formData
      },
      setError(name, message) {
        let formData = this.state.formData

        formData[name].message = message

        this.setState({
          formData: formData,
          isSubmitting: false,
        })

        this.refs[name].focus()
      },
      extractErrors(xhrReturn) {
        let formData = this.state.formData
        let errors = xhrReturn.errors
        let generalMessage = xhrReturn.message

        let firstError = null // field name of first error

        if (_.isObject(errors)) {
          for (let error in errors) {
            formData[error].message = errors[error].join(' ')

            if (!firstError) {
              firstError = error
            }
          }
        }

        if (generalMessage) {
          formData['form'].message = generalMessage
        }

        if (firstError) {
          this.refs[firstError].focus()
        }

        this.setState({
          isSubmitting: false,
          formData: formData,
        })
      },
      extractForm() {
        let self = this

        let toSubmit = {}
        let domNode = null

        for (let ref in self.refs) {
          domNode = findDOMNode(self.refs[ref])

          if (!domNode.name) {
            continue
          }

          // check if array and if so, add to an array
          if (domNode.name.indexOf('[') !== -1) {
            let fieldName = domNode.name.split('[')[0]

            // check if we have to init it
            if (!toSubmit[fieldName]) {
              toSubmit[fieldName] = []
            }

            toSubmit[fieldName].push(domNode.value)
          } else {
            toSubmit[domNode.name] = domNode.value
          }
        }

        return toSubmit
      },
      clearErrors() {
        let formData = this.state.formData

        _.forOwn(formData, function(value, key) {
          value.message = ''
        })

        return formData
      },
      handleFieldChange(e) {
        let formData = this.state.formData

        if (e.target.name.indexOf('[]') !== -1) {
          formData[e.target.name]['value'][e.target.dataset.index] = e.target.value
        } else {
          formData[e.target.name]['value'] = e.target.value
          formData[e.target.name]['modified'] = true
        }

        this.setState({
          formData: formData,
        })
      },
      handlePhoneChange(e) {
        let formData = this.state.formData
        let newValue = Strings.formatPhone(e.target.value)

        if (e.target.name.indexOf('[]') !== -1) {
          formData[e.target.name]['value'][e.target.dataset.index] = newValue
        } else {
          formData[e.target.name]['value'] = newValue
          formData[e.target.name]['modified'] = true
        }

        this.setState({
          formData: formData,
        })
      },
    }
  },
}

module.exports = Form
