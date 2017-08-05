import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Board from '../components/board.js';
import Nav from '../components/game-nav.js';
import NavButton from '../components/nav-button';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import InfoPanel from '../components/info.js';
import { info } from '../utils/info';
import BannerMessage from '../components/banner-message';
import { Util } from '../utils/utils';
import AI from '../utils/ai';
import {
  setSelection,
  clearSelection,
  movePiece,
  deployPiece,
  showReserve,
  hideReserve,
  toggleReserve,
  useEnergy,
  resetEnergy,
  updateInfo,
  incrementActions,
  resetActions,
  passTurn,
  readyAllPieces,
  declareWinner,
  computerPlays,
} from '../actions/gameActions';
import { postGameStateData, postWinner } from '../actions/postGameState';
import { fetchGameStateData } from '../actions/fetchGameState';
// import { fetchGameData, } from '../actions/startup';

class Game extends Component {

  constructor(props) {
    super(props);
    this.gameOver = false;

    this.gameId = this.props.match.params.id;

    if ( this.gameId === 'ai' ) {
      this.ai = new AI({
        player: 'P2',
        pieces: props.pieces,
      });
    }

    this.allLegalMoves = this.allLegalMoves.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.getLegalMoves = this.getLegalMoves.bind(this);
    this.getNodeCount = this.getNodeCount.bind(this);
    this.handleAI = this.handleAI.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideReserve = this.hideReserve.bind(this);
    this.isLegalMove = this.isLegalMove.bind(this);
    this.enoughEnergy = this.enoughEnergy.bind(this);
    this.buildInfoPanel = this.buildInfoPanel.bind(this);
    this.fetchGameState = this.fetchGameState.bind(this);
  }

  componentDidMount() {
    // check path to ensure this is a PvP game
    if ( this.gameId === 'ai' || this.props.game.id === 'ai' ) {
      // playing vs computer
      this.continuallyFetchGameState = false;
    } else {
      this.props.fetchGameStateData(this.gameId);

      this.continuallyFetchGameState = () => {
        if ( this.props.currentPlayer !== this.props.player.player && !this.props.game.winner ) {
          this.fetchGameState(this.gameId);
        }
        window.setTimeout(this.continuallyFetchGameState, 1000);
      }
      this.continuallyFetchGameState();
    }
  }

  componentWillUnmount() {
    this.continuallyFetchGameState = false;
  }

  componentWillReceiveProps(nextProps) {
    const lastPosition = this.props.pieces;
    const nextPosition = nextProps.pieces;
    const { currentPlayer, player } = this.props;
    const id = this.gameId;

    if ( this.gameId === 'ai' || this.props.game.id === 'ai' ) {
      // just play locally.
      console.log('ai game');
    } else {
      if ( nextPosition !== lastPosition && currentPlayer === player.player ) {
        const gameState = {
          moveHistory: nextProps.game.moveHistory,
          pieces: nextProps.pieces,
          actions: nextProps.player.actions,
          currentPlayer: nextProps.currentPlayer
        };

        this.props.postGameStateData(id, gameState);
      }
      // if it became my turn, ensure I have legal moves
    }
  }

  checkForWin(destination) {
    const { pieces, player, declareWinner, postWinner } = this.props;
    const capture = destination.contents;

    if ( capture ) { // a piece is captured
      if ( capture.type === 'hero' ) {
        declareWinner(player.player);
        postWinner(this.gameId, player.player)
      }
      if ( capture.type === 'node' ) {
        const nodeCount = pieces.filter(p => {
          return p.type === 'node' && p.player === capture.player && p.pos === 'prison';
        }).length;
        if (nodeCount >= 2) {
          declareWinner(player.player);
          postWinner(this.gameId, player.player);
        }
      }
    }
  }

  endTurn() {
    this.props.passTurn();
    this.props.readyAllPieces();
    this.props.resetActions();
    this.props.resetEnergy();
  }

  fetchGameState() {
    const { game, fetchGameStateData } = this.props;
    if ( !game.winner ) { fetchGameStateData(this.gameId); }
  }

  getChildContext() {
    var self = this;
    // EXPOSE ACTIONS TO CHILDREN
    return {
      handleClick(hex) { self.handleClick(hex); },
      hideReserve() { self.hideReserve(); },
      toggleReserve() { self.props.toggleReserve(); },
      deployPiece(x, y, z) { self.deployPiece(x, y, z); },
      resetEnergy() { self.props.resetEnergy(); },
      player: this.props.player,
    }
  }

  handleAI(position) {
    const { pieces, computerPlays } = this.props;
    const deploy = ['node', 'pawn', 'bishop', 'rook', 'queen'];
    const [move1, move2] = this.ai.playTwoMoves(position);
    console.log(move1, move2);
    window.setTimeout(() => {
      computerPlays(move1);
    }, 500);
    window.setTimeout(() => {
      computerPlays(move2);
      // THEN: pass turn back to player;
      this.endTurn();
    }, 1000);
  }

  handleClick(hex) {
    const { currentPlayer, selection, player, pieces, winner } = this.props;
    if ( winner ) { return false; }

    if ( !selection ) {
      if ( hex.player === player.player ) {
        this.props.setSelection(hex);
      }
      if ( hex.contents.type ) {
        const infotext = info[hex.contents.type];
        this.props.updateInfo({ text: infotext });
      }
    } else { // selection exists
      const move = {
        player: player.player, // 'P1' or 'P2'
        piece: selection.contents,
        type: selection.contents.type,
        start: selection.pos,
        end: hex.pos,
      };
      const moveIsLegal  = this.isLegalMove(hex.pos);
      const isMyTurn     = currentPlayer === player.player;
      const pieceIsReady = selection.contents.ready;

      if ( !moveIsLegal ) {
        this.props.updateInfo({ text: 'Illegal move!' })
      } else if ( !isMyTurn ) {
        this.props.updateInfo({ text: 'Not your turn yet!' })
      } else if ( !pieceIsReady ) {
        this.props.updateInfo({ text: 'That piece has already acted this turn.' })
      }
      if ( hex.pos === selection.pos ) {
        // nothing happens?
      } else if ( moveIsLegal && isMyTurn && pieceIsReady ) {
        // MAKE THE MOVE:
        if ( selection.pos[0] === 'reserve' ) {
          this.props.deployPiece(selection, hex);
          this.props.useEnergy(selection.contents.cost);
          this.hideReserve();
        } else {
          this.props.movePiece(selection, hex);
          this.checkForWin(hex);
        }
        // THEN HANDLE TURN LOGIC:
        this.props.incrementActions();
        if ( parseInt(player.actions) >= 1 ) {
          this.endTurn();

          if ( this.gameId === 'ai' || this.props.game.id === 'ai' ) {
            const nextPos = Util.getNextPosition(move, pieces, true);
            this.handleAI(nextPos);
          }
        }
      }
      this.props.clearSelection();
    }
  }

  hideReserve() {
    this.props.hideReserve();
  }

  isLegalMove(pos) {
    const { selection, player } = this.props;
    if ( !selection ) { return false; }
    const piece = selection.contents;
    if ( player.player !== piece.player ) { return false } // e.g. P2 selects P1 piece (to see info)
    const moves = this.getLegalMoves(piece).map((m) => { return m.toString() });
    return moves.indexOf(pos.toString()) !== -1;
  }

  isLegal(move) {
    const { selection, currentPlayer } = this.props;
    const thisPlayer = this.props.player.player;
    const { player, piece, start, end } = move;
    if ( !start || !end || !player ) { return false; }

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

    if ( piece.pos === 'prison' ) {
      return []; // no legal moves for captured pieces
    } else if ( piece.pos === 'reserve' ) {
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

  allLegalMoves(player) {
    const { pieces } = this.props;
    const myPieces = pieces.filter(p => p.player === player);
    return myPieces.reduce((acc, p) => acc.concat(this.getLegalMoves(p)), []);
  }

  buildInfoPanel() {
    const { player } = this.props;
    return player ? player.info : 'placeholder';
  }

  enoughEnergy(piece) {
    const { pieces, player } = this.props;
    const energy = this.getNodeCount(player, pieces);
    const remainingEnergy = energy - player.energy;
    return remainingEnergy >= piece.cost;
  }

  getNodeCount(player, pieces) {
    return pieces.filter(p => {
      return p.type === 'node' && p.player === player.player && Array.isArray(p.pos)
    }).length;
  }

  render() {
    const { player, selection, pieces, currentPlayer, game, gameInfo, metadata } = this.props;
    const legalMoves = selection ? this.getLegalMoves(selection.contents) : [];
    const info = this.buildInfoPanel();
    const nodeCount = this.getNodeCount(player, pieces);
    const energyString = player.energy ? `${nodeCount - player.energy}/${nodeCount}` : nodeCount;

    return (
      <div className="game no-scroll">
        <Nav
          options={[
            {
              name: 'Action',
              value: (2 - player.actions),
              handleClick: () => console.log('click!'),
              color: currentPlayer === 'P1' ? 'blue' : 'red',
            },
            {
              name: 'Energy',
              value: energyString,
              handleClick: () => { console.log('click!') },
              color: '#FA0',
            },
            { name: 'Res', handleClick: ()=> { this.props.toggleReserve(); } },
          ]}
          currentPlayer={ currentPlayer }
          player={ player }
          pieces={ pieces }
        >
          <Link to={'/'}>
            <NavButton option={{ name: 'HOME' }} />
          </Link>
        </Nav>
        <Board
          pieces={ pieces }
          legalMoves={ legalMoves }
          selection={ selection }
          nodeCount={ nodeCount }
          player={ player }
        />
        <InfoPanel info={ info }
          game={game}
          gameInfo={ metadata }
          remainingEnergy={ nodeCount - player.energy }
          remainingActions={ 2 - player.actions }
          currentPlayer={ currentPlayer }
        />
      </div>
    )
  }
}

Game.childContextTypes = {
  handleClick: React.PropTypes.func,
  hideReserve: React.PropTypes.func,
  deployPiece: React.PropTypes.func,
  resetEnergy: React.PropTypes.func,
  toggleReserve: React.PropTypes.func,
  player: React.PropTypes.object,
};

function mapStateToProps(state) {
  const {game} = state;
  const gameInfo = state.games.filter(g => g.id === game.id)[0];
  return {
    game: state.game,
    gameInfo: gameInfo,
    selection: game.selection,
    currentPlayer: game.currentPlayer,
    moveCount: game.moveCount,
    player: game.player,
    thisPlayer: game.thisPlayer,
    pieces: game.position,
    currentUser: state.user,
    moveHistory: state.moveHistory,
    metadata: game.metadata,
    winner: game.winner,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSelection: setSelection,
    clearSelection: clearSelection,
    movePiece: movePiece,
    deployPiece: deployPiece,
    showReserve: showReserve,
    hideReserve: hideReserve,
    useEnergy: useEnergy,
    resetEnergy: resetEnergy,
    updateInfo: updateInfo,
    postGameStateData: postGameStateData,
    fetchGameStateData: fetchGameStateData,
    passTurn: passTurn,
    incrementActions: incrementActions,
    resetActions: resetActions,
    readyAllPieces: readyAllPieces,
    toggleReserve: toggleReserve,
    declareWinner: declareWinner,
    postWinner: postWinner,
    computerPlays: computerPlays,
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
