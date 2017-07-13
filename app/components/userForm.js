import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser, continueUser } from '../actions';
import characterDropdown from './characterDropdown';

class userForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClass: 'button is-primary',
      savedUser: null,
      startNew: null
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
      });
    }
    console.log(nextProps);
    if (nextProps.userCreated && nextProps.userCreated.data) {
      localStorage.setItem('cardGameId',nextProps.userCreated.data._id);
      localStorage.setItem('cardGameUsername',nextProps.userCreated.data.username);
    }
  }
  onFormSubmit(values) {
    this.setState({
      buttonClass: 'button is-primary is-loading'
    })
    this.props.createUser(values);
  }
  continueUser() {
    const id = localStorage.getItem('cardGameId');
    const username = localStorage.getItem('cardGameUsername')
    const userObj = {
      _id: id,
      username: username
    };
    this.props.continueUser(userObj);
  }
  render() {
    this.userName = localStorage.getItem('cardGameUsername');
    if (this.userName !== null && this.userName !== undefined && !this.state.startNew) {
      return (
        <div id="form-prompt">
            <span id="continue-as" onClick={this.continueUser.bind(this)}>Continue as {this.userName}</span><span id="form-or">- OR -</span><span id="new-game" onClick={()=> {
              this.setState({startNew: true})
            }}>New Game</span>
        </div>
      )
    } else {
      const { handleSubmit } = this.props
      return (
        <div>
          <h3 className="title is-3" id="fill-details-text">Fill the details to start the game</h3>
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
        </div>
      )
    }
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
  form: 'userForm',
})(
  connect(mapStatetoProps,{createUser, continueUser})(userForm)
)
