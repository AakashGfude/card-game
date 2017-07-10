import { combineReducers } from 'redux';
import { cardReducer, cardContainerReducer, gameCompleteReducer } from './reducer_card';
import CardListReducer from './reducer_cardList';
import { createUserReducer, fetchUsersReducer, fetchMarvelReducer } from './reducer_api';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  card: cardReducer,
  cardContainerReducer: cardContainerReducer,
  cardList: CardListReducer,
  form: formReducer,
  createUser: createUserReducer,
  fetchList: fetchUsersReducer,
  gameComplete: gameCompleteReducer,
  fetchMarvel: fetchMarvelReducer
});

export default rootReducer;
