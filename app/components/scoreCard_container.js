import React, { Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUsers } from '../actions/index';
import ScoreCard from './scoreCard';

class ScoreCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null,
      characterList: null
    }
    this.searchPlayer = this.searchPlayer.bind(this);
    this.filterData = this.filterData.bind(this);
    this.addImageAndNameParam = this.addImageAndNameParam.bind(this);
  }
  componentWillMount() {
    this.props.fetchUsers();
  }
  componentDidUpdate() {
  }
  addImageAndNameParam(user,props) {
    for(let value of props.fetchMarvel.data) {
      if (value.name === user.characterDropdown) {
        user.characterName = value.name;
        user.image = `${value.thumbnail.path}.${value.thumbnail.extension}`
      }
    }
    return user;
  }
  searchPlayer(event) {
    if (event.target.value === '') {
      this.filterData(this.props);
    } else {
      let fillteredArray = _.sortBy(this.props.userList.data.map((user) => {
          return this.addImageAndNameParam(user,this.props);
        }).filter((user) => {
          if (user.username && user.time && user.username.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0) {
            return user;
          }
        }))
        this.setState({
          characterList: fillteredArray
        })
    }
  }
  filterData(newProps) {
    this.setState({
        characterList: _.sortBy(newProps.userList.data.map((user) => {
        return this.addImageAndNameParam(user,newProps);
      }).filter((user) => {
        return (user.time !== 0)
      }),'time',n => {
        return n
      })
    })
  }
  componentWillReceiveProps(newProps) {
    if (newProps.fetchMarvel && newProps.fetchMarvel.data.length) {
      this.filterData(newProps);
    }
  }
  render() {
    return (
      <nav className="panel">
        <p className="panel-heading">
          Score Board
        </p>
        <div className="panel-block search-div">
          <p className="control has-icons-left">
            <input className="input is-small" type="text" placeholder="Search by name" onChange={this.searchPlayer}/>
            <span className="icon is-small is-left">
              <i className="fa fa-search"></i>
            </span>
          </p>
        </div>
        <div className="user-list">
          { this.state.characterList && this.state.characterList.map((score) => {
                return (
                  <ScoreCard key={score._id} name={score.username} characterName={score.characterName} image={score.image} time={score.time}/>
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
