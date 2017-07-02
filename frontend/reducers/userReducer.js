const initialState = false;

export default function(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_REQUEST_PENDING':
      return state;
      break;
    case 'LOGIN_SUCCESS':
      debugger;
      return action.payload;
      break;
    case 'LOGIN_ERROR':
      return state;
      break;
    case 'LOGOUT_REQUEST_PENDING':
      return state;
      break;
    case 'LOGOUT_SUCCESS':
      return initialState;
      break;
    case 'LOGOUT_ERROR':
      return state;
      break;
  }
  return state;
}
