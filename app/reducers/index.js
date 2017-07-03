import { combineReducers } from 'redux';
import { cardReducer, cardContainerReducer } from './reducer_card';
import CardListReducer from './reducer_cardList';
import Scores from './reducer_scores';

const rootReducer = combineReducers({
  card: cardReducer,
  cardContainerReducer: cardContainerReducer,
  cardList: CardListReducer,
  scores: Scores
});

export default rootReducer;
