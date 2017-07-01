const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_GAMES_REQUEST':
      return state;
    case 'FETCH_GAMES_SUCCESS':
      return action.payload;
    case 'FETCH_GAMES_ERROR':
      console.log(action.type);
      return state;
    case 'POST_NEW_GAME_REQUEST':
      return state;
    case 'POST_NEW_GAME_SUCCESS':
      return action.payload;
    case 'POST_NEW_GAME_ERROR':
      console.log(action.type);
      return state;
    case 'UPDATE_RECEIVED':
      debugger;
      return action.payload;
  }
  return state;
}
