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

// const WELCOME_MESSAGE = '''
// Hello, and welcome to HexChess!  Here's a quick primer on the rules:
//
// Object: WIN THE GAME by capturing the enemy HERO or three enemy power NODES.
//
// Each turn, you may perform TWO actions.  You can either DEPLOY a piece from your RESERVE, or you may MOVE a piece on the board (note: you cannot move the same piece twice, nor may you move a piece the same turn you deploy it).
//
// Movement: There are six different types of pieces in Hex Chess: HERO, QUEEN, BISHOP, ROOK, PAWN, and NODE, and each one moves in a different way (power nodes cannot move).
//
// Deployment: You can see what pieces are in your Reserve by clicking the Res button at the bottom of the left panel.  You will see a list that displays the six different types of pieces
// ''';
