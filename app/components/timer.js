import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passTimerValue } from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {timerValue: 0};
    //this.startTimer = this.startTimer.bind(this);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.gameComplete.completed) {
      clearInterval(this.timerID);
      this.props.passTimerValue({
        time: this.state.timerValue
      })
    }
  }
  componentDidUpdate(newProps) {
    if (this.timerID === undefined) {
      this.timerID = setInterval(()=> this.tick(),1000);
    }
  }
  tick() {
    this.setState({
      timerValue: this.state.timerValue + 1
    })
  }
  render() {
    if (!this.props.card) {
      return <p className="title is-1 ta-c">Timer shuru hoga</p>
    }
    return (
      <p className="timer title is-1 ta-c">Timer: {this.state.timerValue}</p>
    );
  }
}

function mapStatetoProps(state) {
  return {
    card: state.card,
    gameComplete: state.gameComplete
  }
};

export default connect(mapStatetoProps, { passTimerValue })(Timer);
