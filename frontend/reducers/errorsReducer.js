const initialState = {};

export default function errors(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_ERROR':
      debugger;
      return Object.assign({}, state, { login: action.payload.message });
      break;
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, { login: [] });
      break;
    case 'SIGNUP_ERROR':
      debugger;
      return Object.assign({}, state, { signup: action.payload.message });
      break;
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, { signup: [] })
  }
  return state;
}
