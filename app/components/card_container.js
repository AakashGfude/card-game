import React, { Component } from 'react';
import Card from './card';
import { connect } from 'react-redux';
import { cardContainerClicked } from '../actions/index';

class cardContainer extends Component {
  constructor(props) {
    super(props);
    this.cardIndexes = {}
  }
  setCardsClicked(index) {
    if (this.cardIndexes.firstCard === undefined) {
      this.cardIndexes.firstCard = index;
    } else if (this.cardIndexes.secondCard === undefined) {
      this.cardIndexes.secondCard = index;
    }
    return this.cardIndexes;
  }
  render() {
    return (
      <div>
        <div className="columns is-multiline">
        { this.props.cardList.map( (card,index) => {
          return (
          <div key={card.img} className="column is-3" onClick={() => {
             this.props.cardContainerClicked(this.setCardsClicked(index))
        }}>
            <Card />
          </div>
        )
        })}
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    cardList: state.cardList
  }
}

export default connect(mapStatetoProps,{ cardContainerClicked })(cardContainer)
