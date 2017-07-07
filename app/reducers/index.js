import { combineReducers } from 'redux';
import { cardReducer, cardContainerReducer } from './reducer_card';
import CardListReducer from './reducer_cardList';
import { createUserReducer, fetchUsersReducer } from './reducer_api';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  card: cardReducer,
  cardContainerReducer: cardContainerReducer,
  cardList: CardListReducer,
  form: formReducer,
  createUser: createUserReducer,
  fetchList: fetchUsersReducer
});

export default rootReducer;
