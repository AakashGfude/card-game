import React, { Component} from 'react';

export default class ScoreCard extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    let divStyle = {
      backgroundImage: 'url('+ this.props.image +')'
    }
    return (
      <a className="panel-block">
        <span className="panel-icon">
          <span className="tooltip-toggle character-pic" aria-label={this.props.characterName} tabIndex="0">
            <div className="character-pic" style={divStyle}></div>
          </span>
        </span>
        <div>
          <p className="title">
            Name: {this.props.name}
          </p>
          <p className="subtitle">
            Time taken: {this.props.time?`${this.props.time}s` : 'Did not Complete'}
          </p>
        </div>
      </a>
    )
  }
}
