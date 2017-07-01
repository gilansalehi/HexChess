import {combineReducers} from 'redux';
import inputReducer from './input';
import gamesIndexReducer from './gamesIndex';
import gameReducer from './gameReducer';

const allReducers = combineReducers({
  input: inputReducer,
  games: gamesIndexReducer,
  game: gameReducer,
});

export default allReducers;
