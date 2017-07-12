import React, { Component } from 'react';
import { selectCard } from '../actions/index';
import { connect } from 'react-redux';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      flip: false,
      times: 0,
      matched: 0
    }
    this.cardClicked = this.cardClicked.bind(this);
  }

  // this function simulates the cardClicked behaviour , but it is not called upon onclick but called when the reducer cardContainer sends an update, i.e , called from componentWillReceiveProps method
  cardClicked(props) {
    // it updates the cards corresponding property in the cards reducer and also in its state, like flip is for flipping it
    let obj = Object.assign({},this.state,{
      index: this.props.cardIndex,
      times: this.state.times + 1,
      flip: true
    });
    this.setState(obj);
    return obj;
  }

  // this function executes every time, cardContainer prop is fetched from reducer, which contains first and second cards i.e whenever the card is clicked
  componentWillReceiveProps(newProps) {
    // this condition flips card which are being clicked
    if(newProps.cardContainer.firstCard.index !== undefined && (newProps.cardContainer.firstCard.index === this.props.cardIndex || newProps.cardContainer.secondCard.index === this.props.cardIndex)) {
      this.props.selectCard(this.cardClicked(newProps));
    }

    // if first and second cards are selected, executes the corresponding behaviour on cards for match or unmatch
    if (newProps.cardContainer.firstCard.index !== undefined && newProps.cardContainer.secondCard.index !== undefined) {
      this.setState({
        index: this.props.cardIndex
      })

      // if they don not match then flip them again
      setTimeout(()=> {
        if (newProps.cardContainer.firstCard.value !== newProps.cardContainer.secondCard.value) {
          this.setState({
            flip: false
          })
        }
      },700)

      // if they match then set the matched property of each card in the pair and call the action creator to update the cards object
      if (newProps.cardContainer.firstCard.value == newProps.cardContainer.secondCard.value &&  (this.props.cardIndex === newProps.cardContainer.firstCard.index || this.props.cardIndex ===  newProps.cardContainer.secondCard.index)) {
        this.setState({  index: this.props.cardIndex,matched: true}, () => this.props.selectCard(this.state));
      }
    }
  }
  render() {
    return (
      <div className={this.state.flip || this.state.matched?'flip flip-container': 'flip-container'}>
        <div className="card-img flipper" id="card-1">
            <div className="front">
                <div className="img-pt box card">
                    <div className="img-cont">
                    </div>
                </div>
            </div>
            <div className="back">
                <div className="img-pt box card">
                    <div className="img-back">
                        <div className="back-detail">
                          {(this.state.matched)?
                            <div className="fuckYea"></div>:
                            <p className="back-name">
                              {this.props.cardvalue}
                            </p>
                          }
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    cardContainer: state.cardContainerReducer
  }
}

export default connect(mapStatetoProps, { selectCard })(Cards);
