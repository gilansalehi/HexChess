const initialState = false;

export default function(state = initialState, action) {
  console.log(state);
  switch(action.type) {
    case 'LOGIN_REQUEST_PENDING':
      return state;
      break;
    case 'LOGIN_SUCCESS':
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
    case 'SIGNUP_REQUEST_PENDING':
      return state;
      break;
    case 'SIGNUP_SUCCESS':
      return action.payload;
      break;
    case 'SIGNUP_ERROR':
      return state;
      break;
  }
  return state;
}
