import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions';

class Anim extends Component {
  constructor(props) {
    super(props);
    this.updateUserData = this.updateUserData.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.timerValue && nextProps.timerValue.time && nextProps.gameComplete.completed) {
      let Dot = this.refs.Dot;
      Dot.style.background = 'white' //.css('background','white');
      Dot.style.zIndex = '2';
      Dot.style.top = '10px';
      Dot.style.left = '10px';
      Dot.style.zoom = '20';
  		if(Dot.classList.contains("anim")){
  		  Dot.classList.remove("anim");
  		}else{
  		  Dot.className += " anim";
  		}
      this.updateUserData(nextProps);
      setTimeout(() => {
  			this.refs.word.className += ' animated';
  			this.refs.finalCardLayout.classList.remove("hide");
  			this.refs.winText.classList.remove('hide');
  		},1000)
    }
  }
  updateUserData(props) {
    this.props.updateUser(Object.assign({},props.userData.data,{
      time: props.timerValue.time
    }))
  }
  playAgain() {
    window.location.reload();
  }
  render() {
    return (
      <div>
        <div className="dot" ref="Dot"></div>
        <div className="final-card-layout hide" ref="finalCardLayout">
          <div>
            <div className="word" ref="word">
                <div className="word-inner-wrap">
                    <img className="hide" id="win-text" ref="winText" src={require("../../images/win.svg")} />
                </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <p id="play-again" onClick={this.playAgain}>PLAY AGAIN</p>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    gameComplete: state.gameComplete,
    userData: state.createUser,
    timerValue: state.timerValue
  }
}

export default connect(mapStatetoProps, { updateUser })(Anim)
