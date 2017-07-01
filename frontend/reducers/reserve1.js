const initialState = 'hidden';

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_RESERVE':
      return 'displayed';
      break;
    case 'HIDE_RESERVE':
      return 'hidden';
      break;
  }
  return state;
}
