import { hero, pawn, bishop, rook, queen, node } from '../utils/pieces';
import { images, info } from '../utils/info';

function repeat(callback, options, repeat) {
  let result = [];
  let i = 0;
  while ( i < repeat ) {
    result.push(callback(options));
    i++;
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
  const thisPlayer = 'P1';
  switch (action.type) {
    case 'MOVE_PIECE':
      var { player, start, end } = action.payload;
      if ( player === thisPlayer ) {
        const newState = state.map((piece) => {
          if ( piece.pos.toString() === start.toString() ) { // piece was moved
            return Object.assign({}, piece, { pos: end }) // update the piece's pos
          } else if ( piece.pos.toString() === end.toString() ) { // piece was captured
            return Object.assign({}, piece, { pos: 'prison' })
          } else {
            return piece;
          }
        });
        return newState;
      }
      break;
    case 'DEPLOY_PIECE':
      var { player, start, end } = action.payload;
      const selectedPiece = action.payload.contents; // state.find((p) => { return p.type === 'pawn' });
      const newState = state.map((piece) => {
        // return piece === selectedPiece ? Object.assign({}, piece, { pos: end }); : piece;
        if ( piece === selectedPiece ) {
          return Object.assign({}, piece, { pos: end });
        } else {
          return piece;
        }
      })
      return newState;
      break;
  }
  return state;
}
