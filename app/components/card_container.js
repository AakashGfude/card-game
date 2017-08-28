import React, { Component } from 'react';
import Card from './card';
import { connect } from 'react-redux';
import { cardContainerClicked, gameComplete } from '../actions/index';

class cardContainer extends Component {
  constructor(props) {
    super(props);
    this.cardIndexes = {};
    this.state = {
      cardIndexes: [],
      gameComplete: false,
      noOfCards: 12
    }
    this.propagateGameCompletionStatus = this.propagateGameCompletionStatus.bind(this);
  }

  // executed on click of the cards - it basically stores which are the firstcard and secondcard in a draw, and executes the action creator to inform to the cards component
  setCardsClicked(index) {

    // this sets the current index clicked
    this.cardIndexes.currentCard = index;

    // this if statement checks if you have clicked on a matched card and prevents it from affecting the reducer;
    if (Object.keys(this.props.card).length !== 0 && this.props.card[index] !== undefined && this.props.card[index]['matched']) {
      // this if statement nulls the firstcard and secondcard if you clicked on a matched card
      if (this.cardIndexes.firstCard !== undefined && this.cardIndexes.secondCard !== undefined) {
        this.cardIndexes = {};
      }
      return this.cardIndexes;
    }

    // these lines of code are to set the firstCard , sencondCard, and a new firstCard after a draw respectively
    if (this.cardIndexes.firstCard === undefined) {
      this.cardIndexes.firstCard = this.state.cardIndexes[index].value;
      this.cardIndexes.firstCardIndex = index;
    } else if (this.cardIndexes.secondCard === undefined && this.cardIndexes.firstCardIndex != index) {
      this.cardIndexes.secondCard = this.state.cardIndexes[index].value;
      this.cardIndexes.secondCardIndex = index;
    } else if (this.cardIndexes.firstCard !== undefined && this.cardIndexes.secondCard !== undefined) {
        this.cardIndexes = {
          firstCard: this.state.cardIndexes[index].value,
          firstCardIndex: index,
          secondCard: undefined,
          secondCardIndex: undefined
        }
    }
    console.log(this.cardIndexes)
    return this.cardIndexes;
  }

  //this function is used to arrange numbers randomly in the backside of the cards
  arrangeNumbers(cardIndexes,boxnumber) {
    let j=0;
  	while (cardIndexes.length<boxnumber) {
  		var isfilled = 0;
  		var rand = Math.floor(Math.random()*(boxnumber/2));
  		if (cardIndexes.length) {
  			for (var i=0; i<cardIndexes.length;i++) {
  				if (rand == cardIndexes[i].value) {
  					isfilled++;
  				}
  			}
  		}
  		if (isfilled<2) {
  			cardIndexes.push({id:j,value:rand});
  		}
      j++;
  	}
    console.log(cardIndexes);
    return cardIndexes;
  }

  propagateGameCompletionStatus(nextProps) {
    let noOfMatches = 0;
    for (var i=0; i<this.state.cardIndexes.length; i++) {
      if (nextProps.card[i].matched) {
        noOfMatches++;
      }
    }
    if (noOfMatches === this.state.cardIndexes.length) {
      this.setState({gameComplete: true},()=> this.props.gameComplete({completed: true}))
    }
  }

  componentWillReceiveProps(nextProps) {
    // check if game is completed or not
    if (nextProps.card && Object.keys(nextProps.card).length >= this.state.cardIndexes.length && !this.state.gameComplete) {
      this.propagateGameCompletionStatus(nextProps);
    }
  }

  componentWillMount() {
    //before the component mounts add the randomly arranged numbers in the cardIndexes state to render them
    this.setState({
      cardIndexes: this.arrangeNumbers(this.state.cardIndexes,this.state.noOfCards)
    });
    
  }
    
  render() {
    return (
      <div>
        <div className="columns is-multiline">
        { this.state.cardIndexes.map( (card,index) => {
          return (
          <div key={card.id} className="column is-3" onClick={() => {
             this.props.cardContainerClicked(this.setCardsClicked(index))
        }}>
            <Card cardvalue={card.value} cardIndex={index} />
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
    card: state.card
  }
}

export default connect(mapStatetoProps,{ cardContainerClicked, gameComplete })(cardContainer)
