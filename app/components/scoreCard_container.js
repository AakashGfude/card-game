import React, { Component} from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/index';
import ScoreCard from './scoreCard';

class ScoreCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null
    }
  }
  componentWillMount() {
    this.props.fetchUsers();
  }
  componentDidUpdate() {
    console.log('update hoga kya bhai?');
  }
  componentWillReceiveProps() {
    console.log(this.props.userList)
  }
  render() {
    console.log(this.props.userList)
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
          { this.props.userList && this.props.userList.data.map((score) => {
                return (
                  <ScoreCard key={score._id} name={score.username} score={score.rank}/>
                )
            })
          }
        </div>
      </nav>
    )
  }
}

function mapStatetoProps(state) {
  return {
    userList: state.fetchList
  }
}

export default connect(mapStatetoProps,{fetchUsers})(ScoreCardContainer);
