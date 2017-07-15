import {combineReducers} from 'redux';
import inputReducer from './input';
import gamesIndexReducer from './gamesIndex';
import gameReducer from './gameReducer';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';

const placeholder = () => {
  return {};
}

const allReducers = combineReducers({
  user: userReducer,
  input: inputReducer,
  games: gamesIndexReducer,
  game: gameReducer,
  errors: errorsReducer,
});

export default allReducers;
