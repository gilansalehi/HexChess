import {combineReducers} from 'redux';
import SelectionReducer from './selection';
import PositionReducer from './pieces';
import PlayerReducer from './player';
import MoveHistory from './moveHistory';
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

const defaultWinner = null;
const winner = (state = defaultWinner, action) => {
  switch (action.type) {
    case 'GAME_OVER':
      return action.payload;
      break;
    case 'POST_WINNER_SUCCESS':
      return action.payload.winner;
      break;
    case 'FETCH_GAME_STATE_SUCCESS':
      return action.payload.winner;
      break;
  }
  return state;
}

const thisPlayer = (state = defaultPlayer, action) => {
  switch (action.type) {
    case 'JOIN_GAME_SUCCESS':
      return action.payload.player;
      break;
    case 'JOIN_GAME_ERROR':
      return 'observer';
      break;
    case 'OBSERVE_GAME_SUCCESS':
      return 'observer'
      break;
    case 'PLAY_COMPUTER':
      return 'P1';
      break;
  }
  return state;
}

const gameId = (state = null, action) => {
  switch (action.type) {
    case 'JOIN_GAME_SUCCESS':
      return action.payload.id;
      break;
    case 'OBSERVE_GAME_SUCCESS':
      return action.payload.id;
      break;
    case 'PLAY_COMPUTER':
      return 'ai';
      break;
  }
  return state;
}

const metadata = (state = {}, action) => {
  switch (action.type) {
    case 'JOIN_GAME_SUCCESS':
      var { creator, challenger } = action.payload;
      return { creator, challenger };
      break;
    case 'OBSERVE_GAME_SUCCESS':
      var { creator, challenger } = action.payload;
      return { creator, challenger };
      break;
    case 'FETCH_GAME_STATE_SUCCESS':
      var { creator, challenger } = action.payload;
      return { creator, challenger };
  }
  return state;
}

const shouldFetch = (state = true, action) => {
  switch (action.type) {
    case 'STOP_ACCEPTING_FETCH_DATA':
      return false;
    case 'BEGIN_ACCEPTING_FETCH_DATA':
      return true;
  }
  return state;
}

const allReducers = combineReducers({
  id: gameId,
  selection: SelectionReducer,
  player: PlayerReducer,
  thisPlayer: thisPlayer,
  position: PositionReducer,
  currentPlayer: currentPlayer,
  moveHistory: MoveHistory,
  metadata: metadata,
  winner: winner,
  shouldFetch: shouldFetch,
});

export default allReducers
