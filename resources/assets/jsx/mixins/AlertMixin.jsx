
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

let AlertMixin = {
  alertMixin() {
    return {
      alert(message) {
        toast(message, {
          type: 'success',
        })
      },
      alertWarning(message) {
        toast(message, {
          type: 'error',
        })
      },
      renderAlertContainer() {
        return (
          <ToastContainer
            position="top-right"
            type="default"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
        )
      },
    }
  },
}

module.exports = AlertMixin
