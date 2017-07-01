import {combineReducers} from 'redux';
import ReserveReducer from './reserve1';
import EnergyReducer from './energy1';
import InfoReducer from './info';

const initialState = combineReducers({
  energy: EnergyReducer, // could in theory pass arg to the function...
  info: InfoReducer,
  player: 'P1',
  reserve: ReserveReducer,
});

export default initialState;
