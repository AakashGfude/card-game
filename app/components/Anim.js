import React, { Component } from 'react';
import { connect } from 'react-redux';

class Anim extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.gameComplete.completed) {
      let Dot = this.refs.Dot;
      Dot.style.background = 'white' //.css('background','white');
      Dot.style.zIndex = '10';
      Dot.style.top = '10px';
      Dot.style.left = '10px';
      Dot.style.zoom = '20';
  		if(Dot.classList.contains("anim")){
  		  Dot.classList.remove("anim");
  		}else{
  		  Dot.className += " anim";
  		}
      console.log(this.refs)
      setTimeout(() => {
        console.log(this.refs, this.refs.word)
  			this.refs.word.className += 'animated';
  			this.refs.finalCardLayout.classList.remove("hide");
  			this.refs.winText.classList.remove('hide');
  		},1000)
    }
  }
  componentDidMount() {
    console.log(this.refs)
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
    gameComplete: state.gameComplete
  }
}

export default connect(mapStatetoProps)(Anim)
