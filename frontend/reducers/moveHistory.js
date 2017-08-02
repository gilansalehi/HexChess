const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'MOVE_PIECE':
      return [payload, ...state];
      break;
    case 'DEPLOY_PIECE':
      return [payload, ...state];
      break;
  }
  return state;
}
