const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_GAMES_REQUEST':
      return state;
      break;
    case 'FETCH_GAMES_SUCCESS':
      return action.payload;
      break;
    case 'FETCH_GAMES_ERROR':
      return state;
      break;
    case 'POST_NEW_GAME_REQUEST':
      return state;
      break;
    case 'POST_NEW_GAME_SUCCESS':
      return [...state, action.payload];
      break;
    case 'POST_NEW_GAME_ERROR':
      return state;
      break;
    case 'UPDATE_RECEIVED':
      debugger;
      return [...state, action.payload];
      break;
  }
  return state;
}
