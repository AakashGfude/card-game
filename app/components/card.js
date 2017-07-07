import React, { Component } from 'react';
import { selectCard } from '../actions/index';
import { connect } from 'react-redux';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      times: 0,
      final: 0
    }
  }
  cardClicked() {
    this.setState({ times: this.state.times + 1, value: true});
    return this.state;
  }
  componentWillReceiveProps(newProps) {
    if (newProps.cardContainer.firstCard !== undefined && newProps.cardContainer.secondCard !== undefined) {
      if (newProps.cardContainer.firstCard == newProps.cardIndex) {
        this.setState({final: 'fuck yea'});
      }
      if (newProps.cardContainer.secondCard == newProps.cardIndex) {
        this.setState({final: 'fuck yea'});
      }
    }
  }
  render() {
    return (
      <div className={this.state.value?'flip flip-container': 'flip-container'} onClick={() => {this.props.selectCard(this.cardClicked())
        }}>
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
                            <p className="back-name">
                              {this.state.final?
                                <img src={require(../../images/fuckYea.jpg)} />
                              :this.props.cardvalue}
                            </p>
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
