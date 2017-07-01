// returns the slice of state that is the selection data
const defaultSelection = false;

export default function (state = defaultSelection, action) {
  switch (action.type) {
    case 'SET_SELECTION':
      return action.payload;
      break;
    case 'CLEAR_SELECTION':
      return defaultSelection;
      break;
  }
  return state;
}
