import {combineReducers} from 'redux';
import SelectionReducer from './selection';
import PositionReducer from './pieces';
import PlayerReducer from './player';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const defaultPlayer = "P1";

const currentPlayer = (state = defaultPlayer, action) => {
  switch (action.type) {
    case 'SWITCH_PLAYER':
      return state === 'P1' ? 'P2' : 'P1';
      break;
    case 'SET_PLAYER':
      return action.payload; // "P1" or "P2"
      break;
    case 'FETCH_GAME_STATE_SUCCESS':
      const { currentPlayer } = JSON.parse(action.payload.position);
      return currentPlayer || 'P1';
      break;
  }
  return state;
};

const allReducers = combineReducers({
  selection: SelectionReducer,
  player: PlayerReducer,
  position: PositionReducer,
  currentPlayer: currentPlayer,
});

export default allReducers