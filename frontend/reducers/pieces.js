import { hero, pawn, bishop, rook, queen, node } from '../utils/pieces';
import { images, info } from '../utils/info';

function repeat(callback, options, repeat) {
  let result = [];
  for (let i = 0; i < repeat; i++) {
    result.push(callback(options));
  }
  return result;
}

function flatten(array) {
  let result = [];
  array.forEach(item => {
    result = result.concat(Array.isArray(item) ? flatten(item) : [item]);
  });
  return result;
}

function buildTeam(player) {
  return [
    hero({ player, imgUrl: images.hero, pos: (player === 'P1' ? [0, -3, 3] : [0, 3, -3]), }),
    queen({ player, imgUrl: images.queen }),
    repeat(pawn,   { player, imgUrl: images.pawn   }, 8),
    repeat(bishop, { player, imgUrl: images.bishop }, 2),
    repeat(rook,   { player, imgUrl: images.rook   }, 2),
    repeat(node,   { player, imgUrl: images.blueGem }, 12),
  ];
}

const initialState = flatten([
  buildTeam('P1'),
  buildTeam('P2'),
]);

export default function (state = initialState, action) {
  switch (action.type) {
    case 'MOVE_PIECE':
      var { player, start, end } = action.payload;
      return state.map((piece) => {
        if ( piece.pos.toString() === start.toString() ) { // piece was moved
          return Object.assign({}, piece, { pos: end, ready: false }) // update the piece's pos
        } else if ( piece.pos.toString() === end.toString() ) { // piece was captured
          return Object.assign({}, piece, { pos: 'prison' })
        } else {
          return piece;
        }
      });
      break;
    case 'DEPLOY_PIECE':
      var { player, start, end } = action.payload;
      const selectedPiece = action.payload.contents; // state.find((p) => { return p.type === 'pawn' });
      return state.map((piece) => {
        // return piece === selectedPiece ? Object.assign({}, piece, { pos: end }); : piece;
        if ( piece === selectedPiece ) {
          return Object.assign({}, piece, { pos: end, ready: false });
        } else {
          return piece;
        }
      });
      break;
    case 'FETCH_GAME_STATE_SUCCESS':
      const { position } = action.payload;
      const { pieces, currentPlayer } = JSON.parse(position)
      return pieces || state;
      break;
    case 'JOIN_GAME_SUCCESS':
      const gameState = JSON.parse(action.payload.position);
      return gameState.pieces;
      break;
    case 'READY_ALL_PIECES':
      return state.map(p => Object.assign({}, p, { ready: true }));
      break;
  }
  return state;
}
