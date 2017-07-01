const defaultInfo = {
  image: null,
  text: null,
};

export default function (state = defaultInfo, action) {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_INFO':
      return { image: payload.image, text: payload.text };
      break;
    case 'CLEAR_INFO':
      return defaultSelection;
      break;
  }
  return state;
}
