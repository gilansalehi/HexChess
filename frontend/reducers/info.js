const WELCOME_MESSAGE = [
  "Hello, and welcome to HexChess!  Here's a quick primer on the rules:",
  "\n",
  "Object: WIN THE GAME by capturing the enemy HERO or three enemy power NODES.",
  "\n",
  "Each turn, you may perform TWO actions.  You can either DEPLOY a piece from ",
  "your RESERVE, or you may MOVE a piece on the board (note: you cannot move the",
  " same piece twice, nor may you move a piece the same turn you deploy it).",
  "\n",
  "Movement: There are six different types of pieces in Hex Chess: ",
  "HERO, QUEEN, BISHOP, ROOK, PAWN, and NODE, and each one moves in a different",
  " way (power nodes cannot move).  Select a piece to see its legal moves.",
  "\n",
  "Deployment: You can see what pieces are in your Reserve by clicking the Res",
  " button at the bottom of the left panel.  You will see a list that displays",
  " the six different types of pieces.  In order to deploy a piece, you must ",
  "have enough ENERGY to deploy it.  Build up your energy by deploying POWER NODES",
  " (which cost 0 energy).",
  "\n",
  "Good luck!",
].join('');

const defaultInfo = [
  {
    image: null,
    text: WELCOME_MESSAGE,
  },
];

export default function (state = defaultInfo, action) {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_INFO':
      return [payload, ...state];
      break;
    case 'CLEAR_INFO':
      return defaultSelection;
      break;
    case 'FETCH_GAME_STATE_SUCCESS':
      const { winner } = action.payload;
      return winner ? [{ image: null, text: winner + ' has won!' }, ...state] : state;
      break;
    case 'JOIN_GAME_ERROR':
      return [
        {
          image: null,
          text: 'ALERT: An error occurred joining this game. Please refresh and try again.'
        },
        ...state,
      ];
      break;
  }
  return state;
}
