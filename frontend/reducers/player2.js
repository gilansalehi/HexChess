import {combineReducers} from 'redux';
// import ActiveUserReducer from './reducer-active-user';
// import SelectionReducer from './selection';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const initialState = combineReducers({
  player: 'player2',
  reserve: 'hidden',
});

export default initialState;

// returns the slice of state that is the selection data
const defaultsxxx = {
  energy: 0,
  avatar: 'avatar',
  reserve: 'hidden',
  heroPos: [],
  pieces: [],
};
