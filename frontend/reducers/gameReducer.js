import {combineReducers} from 'redux';
import SelectionReducer from './selection';
import PositionReducer from './pieces';
import Player1Reducer from './player1';
import Player2Reducer from './player2';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

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
  selection: SelectionReducer,
  player1: Player1Reducer,
  player2: Player2Reducer,
  position: PositionReducer,
  currentPlayer: currentPlayer,
});

export default allReducers
