import {combineReducers} from 'redux';
import ReserveReducer from './reserve1';
import EnergyReducer from './energy1';
import InfoReducer from './info';
import ActionsReducer from './actions';

const defaultPlayer = 'observer';

function playerReducer(state = defaultPlayer, action) {
  switch (action.type) {
    case 'JOIN_GAME_SUCCESS':
      return action.payload.player
      break;
    case 'OBSERVE_GAME_SUCCESS':
      return 'observer';
      break;
  }
  return state;
}

const playerState = combineReducers({
  actions: ActionsReducer,
  energy: EnergyReducer, // could in theory pass arg to the function...
  info: InfoReducer,
  player: playerReducer,
  reserve: ReserveReducer,
});

export default playerState;
