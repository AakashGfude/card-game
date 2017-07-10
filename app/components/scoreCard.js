import React, { Component} from 'react';

export default class ScoreCard extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    let divStyle = {
      backgroundImage: 'url('+ this.props.image +')'
    }
    console.log(divStyle);
    return (
      <a className="panel-block">
        <span className="panel-icon">
          <div className="character-pic" style={divStyle}></div>
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
