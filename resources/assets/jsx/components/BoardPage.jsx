
import React from 'react'

let createReactClass = require('create-react-class')

let Form = require('mixins/FormMixin.jsx')

let BoardPage = createReactClass({
  mixins: [Form.formMixin()],
  getInitialState() {
    let formData = this.initFormData([
      'name',
      'public_key',
    ])

    return {
      formData: formData,
    }
  },
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Asdf.codes</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav pull-right">
                <li>
                  <a
                    href="#"
                    className="text-success"
                  >
                    Unlock
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container text-left">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-3">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Coin</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength="50"
                    name="name"
                    onChange={this.handleFieldChange}
                    placeholder="Coin Name"
                    ref="name"
                    value={this.state.formData.name.value}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Key</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength="50"
                    name="public_key"
                    onChange={this.handleFieldChange}
                    placeholder="Key"
                    ref="public_key"
                    value={this.state.formData.public_key.value}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputFile">.bat File</label>
                  <input type="file" id="exampleInputFile" />
                  <p className="help-block">Example block-level help text here.</p>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

module.exports = BoardPage
