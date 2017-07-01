export const Util = {
  moveFuncs: {
    // CARDINAL DIRECTIONS
    north: function([x, y, z]) { return [x, y + 1, z - 1]; },
    south: function([x, y, z]) { return [x, y - 1, z + 1]; },
    northWest: function([x, y, z]) { return [x - 1, y + 1, z]; },
    northEast: function([x, y, z]) { return [x + 1, y, z - 1]; },
    southWest: function([x, y, z]) { return [x - 1, y, z + 1]; },
    southEast: function([x, y, z]) { return [x + 1, y - 1, z]; },

    // RELATIVE DIRECTIONS
    forward: function(piece) {
      const { player, pos } = piece;
      return player === 'player1' ? this.north(pos) : this.south(pos);
    },
    forwardLeft: function(piece) {
      const { player, pos } = piece;
      return player === 'player1' ? this.northWest(pos) : this.southEast(pos);
    },
    forwardRight: function(piece) {
      const { player, pos } = piece;
      return player === 'player1' ? this.northEast(pos) : this.southWest(pos);
    },
    back: function(piece) {
      const { player, pos } = piece;
      return player === 'player1' ? this.south(pos) : this.north(pos);
    },
    backLeft: function(piece) {
      const { player, pos } = piece;
      return player === 'player1' ? this.southWest(pos) : this.northEast(pos);
    },
    backRight: function(piece) {
      const { player, pos } = piece;
      return player === 'player1' ? this.southEast(pos) : this.northWest(pos);
    },
    none: function() {
      return [];
    },

    getStrings: function(pieces) {
      return pieces.map((p) => { return p.pos.toString(); });
    },

    adjacent: function(piece, allPieces) {
      const pos = piece.pos;
      const [x, y, z] = pos;
      return [
        [x - 1, y + 1, z], [x, y + 1, z - 1],
        [x - 1, y, z + 1], [x + 1, y, z - 1],
        [x, y - 1, z + 1], [x + 1, y - 1, z],
      ];
    },

    inBounds(pos) {
      if ( !Array.isArray(pos) ) { return false; }
      const [x, y, z] = pos;
      return ( x*x < 20 && y*y < 20 && z*z < 20 );
    },

    isCollision(pos, array) {
      return array.indexOf(pos.toString()) > -1;
    },

    keepGoing2(currentPos, nextPos, allHexStrings, enemyHexStrings, includeCaptures) {
      return (!this.isCollision(currentPos, enemyHexStrings) && this.inBounds(nextPos) && ( !this.isCollision(nextPos, allHexStrings) || (includeCaptures && this.isCollision(nextPos, enemyHexStrings))))
    },

    keepGoing(currentPos, nextPos, allHexStrings, enemyHexStrings, includeCaptures) {
      if ( enemyHexStrings.indexOf(currentPos.toString()) !== -1 ) { return false; } // just made a capture
      if ( !this.inBounds(nextPos) ) { return false; }
      if ( allHexStrings.indexOf(nextPos.toString()) < 0 ) {
        return true;            // nothing in the way, keep going.
      } else if ( enemyHexStrings.indexOf(nextPos.toString()) < 0 ) {
        return false;           // something in the way, not an enemy, stop to prevent self-captures.
      } else {
        return includeCaptures; // keep going if we allow captures, otherwise stop;
      }
    },
    // RAYS
    ray: function(dir, piece, allPieces, includeCaptures) {
      const { player, pos } = piece;
      const enemies = allPieces.filter((p) => { return p.player !== player; });
      const allHexStrings = this.getStrings(allPieces);
      const enemyHexStrings = this.getStrings(enemies);

      let moves = [];
      let currentPos = pos;
      let nextPos = this[dir]({ player: player, pos: currentPos });
      while ( this.keepGoing(currentPos, nextPos, allHexStrings, enemyHexStrings, includeCaptures) ) {
        moves.push(nextPos);
        currentPos = nextPos;
        nextPos = this[dir]({ pos: currentPos, player: player });
      }
      return moves;
    },

    castRaysFromDirs(piece, allPieces, dirs, includeCaptures = true) {
      let moves = [];
      dirs.forEach((dir) => {
        moves.push(...this.ray(dir, piece, allPieces, includeCaptures));
      });
      return moves;
    },

    // PIECE MOVE LOGIC
    pawn: function(piece, allPieces) {
      const { pos, player } = piece;
      const allies = allPieces.filter((p) => { return p.player === player; });
      const enemies = allPieces.filter((p) => { return p.player !== player; });
      const allHexStrings = this.getStrings(allPieces);
      const enemyHexStrings = this.getStrings(enemies);
      let moves = [];

      const forward = this.forward(piece);
      const captureLeft = this.forwardLeft(piece);
      const captureRight = this.forwardRight(piece);
      if ( allHexStrings.indexOf(forward.toString()) < 0 ) { moves.push(forward); }
      if ( enemyHexStrings.indexOf(captureLeft.toString()) >= 0 ) { moves.push(captureLeft); }
      if ( enemyHexStrings.indexOf(captureRight.toString()) >= 0) { moves.push(captureRight); }
      return moves;
    },

    bishop: function(piece, allPieces) {
      const { pos, player } = piece;
      const allies = allPieces.filter((p) => { return p.player === player; });
      const enemies = allPieces.filter((p) => { return p.player !== player; });
      const allHexStrings = this.getStrings(allPieces);
      const enemyHexStrings = this.getStrings(enemies);
      let moves = [];
      let dirs = ['forwardLeft', 'forwardRight', 'backLeft', 'backRight'];
      dirs.forEach((dir) => {
        moves.push(...this.ray(dir, piece, allPieces, true));
      });
      return moves;
    },

    rook: function(piece, allPieces) {
      const { pos, player } = piece;
      const allies = allPieces.filter((p) => { return p.player === player; });
      const enemies = allPieces.filter((p) => { return p.player !== player; });
      const allHexStrings = this.getStrings(allPieces);
      const enemyHexStrings = this.getStrings(enemies);
      let moves = [];
      let dirs = ['forward', 'backLeft', 'backRight'];
      dirs.forEach((dir) => {
        moves.push(...this.ray(dir, piece, allPieces, true));
      });
      return moves;
    },

    queen: function(piece, allPieces) {
      const dirs = ['forward', 'forwardLeft', 'forwardRight', 'back', 'backLeft', 'backRight'];
      return this.castRaysFromDirs(piece, allPieces, dirs);
    },
  },


  getHeroPos: function(p) { return false; }, // TODO

  getStrings: function(pieces) {
    return pieces.map((p) => { return p.pos.toString(); });
  },

  inBounds(pos) {
    if ( !Array.isArray(pos) ) { return false; }
    const [x, y, z] = pos;
    return ( x*x < 20 && y*y < 20 && z*z < 20 );
  },

  isCollision(pos, array) {
    return array.indexOf(pos.toString()) > -1;
  },

  getNodeCount(player, allPieces) {
    return allPieces.filter((p) => {
      return (p.type === 'node' && p.player === player && Array.isArray(p.pos));
    }).length;
  },

  text(element) {
    const elements = {
      hex: '⎔',
      sun: '❂',
      energy: '⟡',
      e2: '✨',
      e3: '◌',
      e4: '⁕',
      star: '✶',
      power: 'ᚹ',
      gamma: 'γ',
      infinity: '∞',
      sheild: '⏠',
    };

    return elements[element];
  },
}
