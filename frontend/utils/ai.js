import Util from './utils';

export default class AI {
  constructor(options) {
    this.player = options.player; // should be 'P2'
    this.pieces = options.pieces;

    this.analyzeBoard = this.analyzeBoard.bind(this);
    this.calculateMove = this.calculateMove.bind(this);
    this.getLegalMoves = this.getLegalMoves.bind(this);
    this.randomMove = this.randomMove.bind(this);
  }

  analyzeBoard(pieces) {
    // analyze the board and return a bunch of useful objects
    const myHero = pieces.filter(p => p.type === 'hero' && p.player === this.player);
    const myPieces = pieces.filter(p => p.player === this.player);
    const myPositionStrings = myPieces.map(p => p.pos.join(''));

    const myLegalMoves = myPieces.reduce((acc, p) => {
      const legalMoves = this.getLegalMoves(p);
      acc[p.pos.join('')] = acc[p.pos.join('')] || [];
      return legalMoves.length ? acc[key].concat(legalMoves) : acc;
    }, {});

    const enemyHero = pieces.filter(p => p.type === 'hero' && p.player !== this.player);
    const enemyPieces = pieces.filter(p => p.player !== this.player && Array.isArray(p.pos));
    const threatenedHexes = enemyPieces.reduce((acc, p) => {
      const hexStrings = this.getLegalMoves(p).map(m => m.join(''));
      return acc.concat(hexStrings);
    }, []);

    // if enemy hero is threatened, capture it to win the game
    const enemyHeroThreatened = myPieces.reduce((acc, p) => {
      return this.getLegalMoves(p).map(m => m.join('')).includes(enemyHero.pos.join(''))
    }, false);
    const myHeroThreatened = threatenedHexes.includes(myHero.pos.join(''));

    const myNodeCount = Util.getNodeCount(this.player, pieces); // on board
    const capturedEnemyNodes = pieces.filter(p => p.type === 'node' && p.pos === 'prison').length;

    return {
      myHero,
      myPieces,
      myLegalMoves,
      myHeroThreatened,
      enemyHero,
      enemyPieces,
      enemyHeroThreatened,
      threatenedHexes,
      myNodeCount,
      capturedEnemyNodes,
    };
  }

  calculateMove() {
    // 1. If I can win the game, do that.

    // 2. If I'm about to lose, try to stop it (or pick a random move)

    // 3. If I can capture a valuable piece, do that

    // 4. If I'm about to lose a valuable piece, save it

    // 5. Otherwise, develop my board.

    // 6. Otherwise, play a random legal move
    return this.randomMove();
  }


  getLegalMoves(piece) {
    // calculates a piece's legal moves from its type
    if ( piece.pos === 'prison' ) { return []; }

    let legalMoves = [];
    const { player, pieces } = this;
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

  rankPieceMoves(piece) {
    // first build a scoreMap for captures; an object with hex positions and the value of the pieces there
    // then build a defended hexes map for the legal moves of enemy pieces, hexes map to the lowest value of piece that can move there.?
    // then score the move:
    // if isCapture
    // score += value of captured piece
    // hero worth a million
    // node worth 1, 4, a million depending on number of captured nodes.
    // else
    // makes a threat:
    // score += half the value of threatened pieces of
    // piece deployment += value of the piece
    // node deployment += 2
    // piece move += value of the capture
    // value of legalMoves.length?
  }

  rateMove(piece, position, destination) {
    let rating = 0;

  }

  randomMove() {
    const { myPieces, myLegalMoves } = this.analyzeBoard(this.pieces);
    const myLegalPieces = myPieces.filter(p => myLegalMoves[p.pos.join('')].length > 0);
    const selectedPiece = myLegalPieces[
      Math.floor( Math.random() * myLegalPieces.length )
    ];
    const startPos = selectedPiece.pos;
    const endPos = myLegalMoves[startPos.join('')][0];

    return {
      player: this.player,
      contents: selectedPiece,
      start: startPos,
      end: endPos,
    }
  }
}
