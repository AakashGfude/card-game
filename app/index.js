import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
require('../styles/main.scss');

import CardContainer from './components/card_container';
import Timer from './components/timer';
import ScoreCardContainer from './components/scoreCard_container';
import UserModal from './components/userModal';
import Anim from './components/Anim';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

class App extends Component {
  render() {
    return (
        <div>
          <UserModal />
          <Anim />
          <div className="columns">
            <div className="column">
              <div className="container p-40">
                <Timer />
              </div>
              <div className="container p-40 p-b0">
                <CardContainer />
              </div>
            </div>
            <div className="column" id="score-card-container">
              <ScoreCardContainer />
            </div>
          </div>
        </div>
    )
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,document.querySelector('.main-section'));
