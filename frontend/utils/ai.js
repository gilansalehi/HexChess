import {Util} from './utils';

export default class AI {
  constructor(options) {
    this.player = options.player; // should be 'P2'
    this.previousEnergyConsumed = 0;

    this.analyzeBoard = this.analyzeBoard.bind(this);
    this.calculateMove = this.calculateMove.bind(this);
    this.enoughEnergy = this.enoughEnergy.bind(this);
    this.getLegalMoves = this.getLegalMoves.bind(this);
    this.randomMove = this.randomMove.bind(this);
    this.playTwoMoves = this.playTwoMoves.bind(this);
  }

  analyzeBoard(pieces) {
    // analyze the board and return a bunch of useful objects
    const myHero = pieces.filter(p => p.type === 'hero' && p.player === this.player)[0];
    const myPieces = pieces.filter(p => p.player === this.player && p.pos !== 'prison');
    const myPositionStrings = myPieces.map(p => p.pos.toString());

    const myLegalMoves = myPieces.reduce((acc, p) => {
      const legalMoves = this.getLegalMoves(p, pieces);
      if ( !legalMoves.length ) { return acc; }
      if ( p.pos === 'reserve' ) {
        acc[p.type] = legalMoves;
      } else {
        acc[p.pos.toString()] = legalMoves;
      }
      return acc;
    }, {});

    const enemyHero = pieces.filter(p => p.type === 'hero' && p.player !== this.player)[0];
    const enemyPieces = pieces.filter(p => p.player !== this.player && Array.isArray(p.pos));
    const threatenedHexes = enemyPieces.reduce((acc, p) => {
      const hexStrings = this.getLegalMoves(p, pieces).map(m => m.toString());
      return acc.concat(hexStrings);
    }, []);
    // if enemy hero is threatened, capture it to win the game
    const enemyHeroThreatened = Object.values(myLegalMoves)
      .reduce((acc, dest) => acc.concat(dest))
      .includes(enemyHero.pos.toString());
    const myHeroThreatened = threatenedHexes.includes(myHero.pos.toString());

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
      position: pieces,
    };
  }

  calculateMove(position) {
    const analysis = this.analyzeBoard(position);
    // 1. If I can win the game, do that.

    // 2. If I'm about to lose, try to stop it (or pick a random move)

    // 3. If I can capture a valuable piece, do that

    // 4. If I'm about to lose a valuable piece, save it

    // 5. Otherwise, develop my board.

    // 6. Otherwise, play a random legal move
    return this.randomMove(analysis);
  }

  enoughEnergy(piece, position) {
    const nodeCount = position.filter(p => {
      return p.type === 'node' && p.player === piece.player && Array.isArray(p.pos)
    });
    return (this.previousEnergyConsumed + piece.cost <= nodeCount);
  }

  getLegalMoves(piece, position) {
    // calculates a piece's legal moves from its type
    if ( piece.pos === 'prison' || !piece.ready ) { return []; }

    let legalMoves = [];
    const { player } = this;
    const thisPlayer = piece.player;
    const { moveFuncs, getHeroPos, getStrings, inBounds } = Util;
    const noSelfCaptures = position.filter(p => p.player === thisPlayer).map(p => p.pos.toString());
    const occupiedHexStrings = Util.getStrings(position);

    if ( piece.pos === 'reserve' ) {
      if ( this.enoughEnergy(piece, position) && piece.ready ) { // this.payEnergyCost
        const hero = position.filter(p => {
          return p.type === 'hero' && p.player === piece.player;
        })[0];
        const hexes = moveFuncs['adjacent'](hero);
        const movesArr = hexes.filter((hex) => {
          return inBounds(hex) && !occupiedHexStrings.includes(hex.toString());
        });
        legalMoves.push(...movesArr);
      } else {
        console.log('not enough energy to deploy ', piece.type);
      }
    } else {
      piece.moveDirs.forEach((dir) => {
        const hexes = moveFuncs[dir](piece, position);
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

  randomMove(analysis) {
    // check types.
    const { myPieces, myLegalMoves } = analysis;
    const randomPiece = Object.keys(myLegalMoves)[
      Math.floor( Math.random() * Object.keys(myLegalMoves).length )
    ];
    const selectedPiece = myPieces.filter(p => {
      return p.type === randomPiece || p.pos.toString() === randomPiece;
    })[0];
    const startPos = selectedPiece.pos;
    const legalDestinations = myLegalMoves[randomPiece];
    const endPos = legalDestinations[
      Math.floor( Math.random() * legalDestinations.length )
    ];

    if ( startPos === 'reserve' ) { // track the energy cost;
      this.previousEnergyConsumed = selectedPiece.cost;
    }

    return {
      player: this.player,
      type: selectedPiece.type,
      contents: selectedPiece,
      start: startPos,
      end: endPos,
    }
  }

  playTwoMoves(position) {
    this.previousEnergyConsumed = 0;
    const move1 = this.calculateMove(position);
    const nextPosition = Util.getNextPosition(move1, position);
    const move2 = this.calculateMove(nextPosition);
    return [move1, move2];
  }
}
