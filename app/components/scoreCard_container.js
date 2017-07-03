import React, { Component} from 'react';
import { connect } from 'react-redux';

import ScoreCard from './scoreCard';

class ScoreCardContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="panel">
        <p className="panel-heading">
          Score Board
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input is-small" type="text" placeholder="Search" />
            <span className="icon is-small is-left">
              <i className="fa fa-search"></i>
            </span>
          </p>
        </div>
        <div>
          {this.props.scores.map((score) => {
            return (
              <ScoreCard key={score.id} name={score.name} score={score.score}/>
            )
          })}
        </div>
      </nav>
    )
  }
}

function mapStatetoProps(state) {
  return {
    scores: state.scores
  }
}

export default connect(mapStatetoProps)(ScoreCardContainer);
