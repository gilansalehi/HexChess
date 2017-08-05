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
    case 'FETCH_GAME_STATE_SUCCESS':
      var { moveHistory } = JSON.parse(payload.position)
      return moveHistory.length > state.length ? moveHistory : state;
      break;
    case 'JOIN_GAME_SUCCESS':
      var { moveHistory } = JSON.parse(payload.position);
      return moveHistory.length > state.length ? moveHistory : state;
      break;
  }
  return state;
}
