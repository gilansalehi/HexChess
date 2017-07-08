const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case 'USE_ENERGY':
      const usedUp = state + action.payload;
      return usedUp;
      break;
    case 'RESET_ENERGY':
      return initialState;
      break;
  }
  return state;
}
