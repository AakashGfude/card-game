import React, { Component } from 'react';
import UserForm from './userForm';
import { connect } from 'react-redux';
import { callMarvel } from '../actions/index.js';

class userModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalClass:'modal is-active' };
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userCreated != this.props.userCreated) {
      setTimeout(()=> {
        this.setState({
          modalClass: 'modal'
        })
      },500)
    }
  }
  componentWillMount() {
    this.props.callMarvel();
  }
  closeModal() {
    this.setState({
      modalClass: 'modal'
    })
  }
  render() {
    console.log('does it render?')
    return (
      <div id="userModal" className={this.state.modalClass}>
        <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <UserForm />
            </div>
          </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    userCreated: state.createUser,
    fetchMarvel: state.fetchMarvel
  }
}

export default connect(mapStatetoProps, { callMarvel })(userModal);
