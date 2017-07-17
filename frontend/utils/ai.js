import Util from './utils';

export default class AI = {
  constructor(options) {
    super(options)

    this.player = options.player;
    this.pieces = options.pieces;
  }

  calculateMove(pieces) {
    const hero = pieces.filter(p => p.type === 'hero' && p.player === this.player);
    const myPieces = pieces.filter(p => p.player === this.player);
    const enemyPieces = pieces.filter(p => p.player !== this.player && Array.isArray(p.pos));

    const myHeroThreatened = enemyPieces.reduce((acc, p) => {
      return this.getLegalMoves(p).map(m => m.toString()).includes(hero.pos.toString())
    }, false);
    // TODO
  }

  getLegalMoves(piece) {
    // calculates a piece's legal moves from its type
    let legalMoves = [];
    const { player, pieces } = this.props;
    const thisPlayer = piece.player;
    const { moveFuncs, getHeroPos, getStrings, inBounds } = Util;
    const noSelfCaptures = getStrings(
      pieces.filter(p => p.player === thisPlayer)
    );
    const occupiedHexStrings = getStrings(pieces);

    if ( piece.pos === 'reserve' ) {
      if ( this.enoughEnergy(piece) ) { // this.payEnergyCost
        const hero = pieces.filter(p => {
          return p.type === 'hero' && p.player === piece.player;
        })[0];
        const hexes = moveFuncs['adjacent'](hero);
        const movesArr = hexes.filter((hex) => {
          return inBounds(hex) && occupiedHexStrings.indexOf(hex.toString()) < 0;
        });
        legalMoves.push(...movesArr);
      }
    } else {
      piece.moveDirs.forEach((dir) => {
        const hexes = moveFuncs[dir](piece, pieces);
        const movesArr = hexes.filter((hex) => {
          return inBounds(hex) && noSelfCaptures.indexOf(hex.toString()) < 0;
        });
        legalMoves.push(...movesArr);
      });
    }

    return legalMoves;
  }

}
