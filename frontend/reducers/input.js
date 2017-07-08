const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case 'KEYDOWN':
      const newState = action.payload;
      return newState;
      break;
    case 'RESET_INPUT':
      return initialState;
      break;
  }
  return state;
}
