const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_GAMES_REQUEST':
      return state;
      break;
    case 'FETCH_GAMES_SUCCESS':
      debugger;
      console.log(action.payload);
      return action.payload;
      break;
    case 'FETCH_GAMES_ERROR':
      console.log(action.type);
      return state;
      break;
    case 'POST_NEW_GAME_REQUEST':
      return state;
      break;
    case 'POST_NEW_GAME_SUCCESS':
      return action.payload;
      break;
    case 'POST_NEW_GAME_ERROR':
      console.log(action.type);
      return state;
      break;
    case 'UPDATE_RECEIVED':
      return action.payload;
      break;
  }
  return state;
}
