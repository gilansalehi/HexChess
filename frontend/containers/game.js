import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Board from '../components/board.js';
import Nav from '../components/game-nav.js';
import NavButton from '../components/nav-button';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import InfoPanel from '../components/info.js';
import BannerMessage from '../components/banner-message';
import { Util } from '../utils/utils';
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
} from '../actions/gameActions';
import { postGameStateData } from '../actions/postGameState';
import { fetchGameStateData } from '../actions/fetchGameState';
// import { fetchGameData, } from '../actions/startup';

class Game extends Component {

  constructor(props) {
    super(props);
    this.gameOver = false;

    this.checkForWin = this.checkForWin.bind(this);
    this.gameId = this.props.match.params.id;
    this.getLegalMoves = this.getLegalMoves.bind(this);
    this.getNodeCount = this.getNodeCount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideReserve = this.hideReserve.bind(this);
    this.isLegalMove = this.isLegalMove.bind(this);
    this.enoughEnergy = this.enoughEnergy.bind(this);
    this.buildInfoPanel = this.buildInfoPanel.bind(this);
    this.fetchGameState = this.fetchGameState.bind(this);
  }

  componentDidMount() {
    this.props.fetchGameStateData(this.gameId);

    this.continuallyFetchGameState = () => {
      if ( this.props.currentPlayer !== this.props.player.player ) {
        this.fetchGameState(this.gameId);
      }
      window.setTimeout(this.continuallyFetchGameState, 1000);
    }
    this.continuallyFetchGameState();
  }

  componentWillUnmount() {
    this.continuallyFetchGameState = false;
  }

  componentWillReceiveProps(nextProps) {
    const lastPosition = this.props.pieces;
    const nextPosition = nextProps.pieces;
    const { currentPlayer, player } = this.props;
    const id = this.gameId;
    // this.checkForWin(nextPosition);
    // double check that THIS player made the change
    if ( nextPosition !== lastPosition && currentPlayer === player.player ) {
      const gameState = {
        pieces: nextProps.pieces,
        actions: nextProps.player.actions,
        currentPlayer: nextProps.currentPlayer
      };

      this.props.postGameStateData(id, gameState);
    }
  }

  checkForWin(pieces) {
    const prisoners = pieces.filter(p => p.pos === 'prison');
    const capturedHeroes = prisoners.filter(p => p.type === 'hero');
    const capturedNodes = prisoners.filter(p => p.type === 'node');
    const capturedBlueNodes = capturedNodes.filter(n => n.player === 'P1');
    const capturedRedNodes  = capturedNodes.filter(n => n.player === 'P2');
    let winner = false;
    let message = '';
    if ( capturedHeroes.length ) {
      winner = capturedHeroes[0].player === 'P2' ? 'Blue' : 'Red';
      message = `${winner} wins by capturing the enemy hero!`;
    }
    if ( capturedBlueNodes.length >= 3 ) {
      winner = 'Red';
      message = 'Red wins by capturing three enemy nodes!';
    }
    if ( capturedRedNodes.length >= 3 ) {
      winner = 'Blue';
      message = 'Blue wins by capturing three enemy nodes!';
    }
    if (winner) { this.gameOver = true; }
    return { winner, message };
  }

  fetchGameState() {
    this.props.fetchGameStateData(this.gameId);
  }

  getChildContext() {
    var self = this;
    // EXPOSE ACTIONS TO CHILDREN
    return {
      handleClick(hex) { self.handleClick(hex); },
      hideReserve() { self.hideReserve(); },
      deployPiece(x, y, z) { self.deployPiece(x, y, z); },
      resetEnergy() { self.props.resetEnergy(); },
      player: this.props.player,
    }
  }

  handleClick(hex) {
    if ( this.gameOver ) { return false; }
    const { currentPlayer, selection, player } = this.props;

    if ( !selection ) {
      if ( hex.player === player.player ) {
        this.props.setSelection(hex);
      }
      this.props.updateInfo({ image: hex.contents.imgUrl, text: hex.contents.info });
    } else { // selection exists
      const moveIsLegal  = this.isLegalMove(hex.pos);
      const isMyTurn     = currentPlayer === player.player;
      const pieceIsReady = selection.contents.ready;

      if ( !moveIsLegal ) {
        this.props.updateInfo({ text: "Illegal move!" })
      } else if ( !isMyTurn ) {
        this.props.updateInfo({ text: "Not your turn yet!" })
      } else if ( !pieceIsReady ) {
        this.props.updateInfo({ text: "That piece has already acted this turn." })
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
          // check for game winning states?
        }
        // THEN HANDLE TURN LOGIC:
        this.props.incrementActions();
        // this.checkForWin(selection, hex);
        if ( parseInt(player.actions) >= 1 ) {
          this.props.passTurn();
          this.props.readyAllPieces();
          this.props.resetActions();
          this.props.resetEnergy();
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
    const { player, selection, pieces, currentPlayer } = this.props;
    const legalMoves = selection ? this.getLegalMoves(selection.contents) : [];
    const info = this.buildInfoPanel();
    const nodeCount = this.getNodeCount(player, pieces);
    const energyString = player.energy ? `${nodeCount - player.energy}/${nodeCount}` : nodeCount;

    return (
      <div className="game">
        <BannerMessage pieces={pieces} />
        <Nav
          options={[
            { name: 'fetch', handleClick: () => { this.fetchGameState() } },
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
  player: React.PropTypes.object,
  deployPiece: React.PropTypes.func,
  resetEnergy: React.PropTypes.func,
};

function mapStateToProps(state) {
  const {game} = state;
  return {
    game: state.game,
    selection: game.selection,
    currentPlayer: game.currentPlayer,
    moveCount: game.moveCount,
    player: game.player,
    pieces: game.position,
    currentUser: state.user,
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
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Game);