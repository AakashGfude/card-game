import React, { Component } from 'react';
import Card from './card';
import { connect } from 'react-redux';
import { cardContainerClicked } from '../actions/index';

class cardContainer extends Component {
  constructor(props) {
    super(props);
    this.cardIndexes = {};
    this.state = {
      values : 0,
      cardIndexes: []
    }
  }
  setCardsClicked(index) {
    if (this.cardIndexes.firstCard === undefined) {
      this.cardIndexes.firstCard = index;
    } else if (this.cardIndexes.secondCard === undefined) {
      this.cardIndexes.secondCard = index;
    }
    console.log(this.cardIndexes);
    return this.cardIndexes;
  }

  arrangeNumbers(cardIndexes,boxnumber) {
  	while (cardIndexes.length<boxnumber) {
  		var isfilled = 0;
  		var rand = Math.floor(Math.random()*(boxnumber/2));
  		if (cardIndexes.length) {
  			for (var i=0; i<cardIndexes.length;i++) {
  				if (rand == cardIndexes[i]) {
  					isfilled++;
  				}
  			}
  		}
  		if (isfilled<2) {
  			cardIndexes.push(rand);
  		}
  	}
    return cardIndexes;
  }

  componentDidMount() {
    this.setState({
      values: this.props.cardList.length
    }, ()=> {
      this.setState({
        cardIndexes: this.arrangeNumbers(this.state.cardIndexes,this.state.values)
      })
    })
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
            <Card cardvalue={this.state.cardIndexes[index]} cardIndex={index} />
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
