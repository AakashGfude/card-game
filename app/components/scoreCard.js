import React, { Component} from 'react';

export default class ScoreCard extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <a className="panel-block">
        <span className="panel-icon">
          <i className="fa fa-user-secret"></i>
        </span>
        <div>
          <p className="title">
            Name: {this.props.name}
          </p>
          <p className="subtitle">
            Score: {this.props.score}
          </p>
        </div>
      </a>
    )
  }
}
