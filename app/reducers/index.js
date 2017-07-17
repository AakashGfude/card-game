import { combineReducers } from 'redux';
import { cardReducer, cardContainerReducer, gameCompleteReducer } from './reducer_card';
import timerValueReducer from './reducer_timer';
import { createUserReducer, fetchUsersReducer, fetchMarvelReducer } from './reducer_api';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  card: cardReducer,
  cardContainerReducer: cardContainerReducer,
  form: formReducer,
  createUser: createUserReducer,
  fetchList: fetchUsersReducer,
  gameComplete: gameCompleteReducer,
  fetchMarvel: fetchMarvelReducer,
  timerValue: timerValueReducer
});

export default rootReducer;
