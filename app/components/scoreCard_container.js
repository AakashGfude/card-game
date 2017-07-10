import React, { Component} from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/index';
import ScoreCard from './scoreCard';

class ScoreCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null,
      characterList: null
    }
  }
  componentWillMount() {
    this.props.fetchUsers();
  }
  componentDidUpdate() {
  }
  componentWillReceiveProps(newProps) {
    if (newProps.fetchMarvel && newProps.fetchMarvel.data.length) {
      this.setState({
          characterList: newProps.userList.data.map((user) => {
          for(let value of newProps.fetchMarvel.data) {
            if (value.name === user.characterDropdown) {
              user.image = `${value.thumbnail.path}.${value.thumbnail.extension}`
            }
          }
          return user;
        })
      })
    }
  }
  render() {
    console.log(this.state.characterList);
    return (
      <nav className="panel">
        <p className="panel-heading">
          Score Board
        </p>
        <div className="panel-block search-div">
          <p className="control has-icons-left">
            <input className="input is-small" type="text" placeholder="Search" />
            <span className="icon is-small is-left">
              <i className="fa fa-search"></i>
            </span>
          </p>
        </div>
        <div className="user-list">
          { this.state.characterList && this.state.characterList.map((score) => {
                return (
                  <ScoreCard key={score._id} name={score.username} score={score.rank} image={score.image} characterName={score.characterDropdown}/>
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
    userList: state.fetchList,
    fetchMarvel: state.fetchMarvel
  }
}

export default connect(mapStatetoProps,{fetchUsers})(ScoreCardContainer);
