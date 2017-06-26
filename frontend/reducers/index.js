import {combineReducers} from 'redux';
import inputReducer from './input';

const defaultPlayer = "P1";

const currentPlayer = (state = defaultPlayer, action) => {
  switch (action.type) {
    case 'SWITCH_PLAYER':
      return action.payload; // "player1" or "player2"
      break;
    case 'SET_PLAYER':
      return action.payload; // "player1" or "player2"
      break;
  }
  return state;
};

const allReducers = combineReducers({
  currentPlayer: currentPlayer,
  input: inputReducer,
});

export default allReducers
