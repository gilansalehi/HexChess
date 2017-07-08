const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT_ACTIONS':
      return state + 1;
      break;
    case 'RESET_ACTIONS':
      return 0;
      break;
    case 'JOIN_GAME_SUCCESS':
      const { position, player } = action.payload;
      const { actions, currentPlayer } = JSON.parse(position);
      return player === 'P1' ? actions : 0;
      break;
  }
  return state;
}
