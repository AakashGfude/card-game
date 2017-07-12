import React, { Component } from 'react';
import UserForm from './userForm';
import { connect } from 'react-redux';
import { callMarvel } from '../actions/index.js';
const JCimg = require('../../images/Jackie-Chan-WTF.jpg');

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
    return (
      <div id="userModal" className={this.state.modalClass}>
        <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <h3 className="title is-3" id="fill-details-text">Fill the details to start the game</h3>
              <div className="game-info">
                <span className="tooltip-toggle" aria-label="All the cards have numbers hidden inside them. In one draw you have to click on two cards to flip them and reveal their number. If the numbers match, then they are removed from the list. You have to match all the cards in this manner. Once all the cards are matched, the game is finished and the time of completion is noted. This game is all about being fast(not furious)" tabIndex="0">
                  <img src={JCimg} />
                  <p>What is this?</p>
                </span>
              </div>
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
