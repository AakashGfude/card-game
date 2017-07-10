import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import characterDropdown from './characterDropdown';

class userForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClass: 'button is-primary'
    }
  }
  renderTitleField(field) {
    return (
      <div className="field">
        <label className="label">Name</label>
          <p className="control">
            <input
             className="input"
              type="text"
              {...field.input}
            />
          </p>
        <p className="help is-danger">{field.meta.touched ? field.meta.error : ''}</p>
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userCreated != this.props.userCreated) {
      this.setState({
        buttonClass: 'button is-primary'
      })
    }
  }
  onFormSubmit(values) {
    console.log(values);
    this.setState({
      buttonClass: 'button is-primary is-loading'
    })
    this.props.createUser(values);
  }
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field
          name="username"
          component={this.renderTitleField}
        />
        <Field
          name="characterDropdown"
          component={characterDropdown}
        />
        <div className="block">
          <button className={this.state.buttonClass}   type="submit">Play</button>
        </div>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Enter a username";
  }
  if (!values.characterDropdown) {
    errors.characterDropdown = "Please select a character";
  }
  return errors;
}

function mapStatetoProps(state) {
  return {
    userCreated: state.createUser
  }
}

export default reduxForm({
  validate,
  form: 'userForm'
})(
  connect(mapStatetoProps,{createUser})(userForm)
)
