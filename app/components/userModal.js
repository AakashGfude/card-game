import React, { Component } from 'react';
import UserForm from './userForm';
import { connect } from 'react-redux';

class userModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalClass:'modal is-active' };
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
  render() {
    return (
      <div id="userModal" className={this.state.modalClass}>
        <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <UserForm />
            </div>
          </div>
        <button className="modal-close is-large"></button>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    userCreated: state.createUser
  }
}

export default connect(mapStatetoProps)(userModal);
