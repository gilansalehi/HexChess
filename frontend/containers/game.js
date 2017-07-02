import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Board from '../components/board.js';
import Nav from '../components/nav.js';
import InfoPanel from '../components/info.js';
import { Util } from '../utils/utils';
import {
  setSelection,
  clearSelection,
  movePiece,
  deployPiece,
  showReserve,
  hideReserve,
  useEnergy,
  resetEnergy,
  updateInfo,
} from '../actions/gameActions.js';
import {
  fetchGameData,
} from '../actions/startup';
// import Hex from './hex.js';
// import Reserve from './reserve.js';
// import Controls from './controls.js';

class Game extends Component {

  constructor(props) {
    super(props);
    this.getLegalMoves = this.getLegalMoves.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideReserve = this.hideReserve.bind(this);
    this.isLegalMove = this.isLegalMove.bind(this);
    this.enoughEnergy = this.enoughEnergy.bind(this);
    this.buildInfoPanel = this.buildInfoPanel.bind(this);
  }

  getChildContext() {
    var self = this;
    //EXPOSE ACTIONS TO CHILDREN
    return {
      handleClick(hex) { self.handleClick(hex); },
      hideReserve() { self.hideReserve(); },
      deployPiece(x, y, z) { self.deployPiece(x, y, z); },
      resetEnergy() { self.props.resetEnergy(); },
      player1: this.props.player1,
      player2: this.props.player2,
    }
  }

  handleClick(hex) {
    const { currentPlayer, selection } = this.props;
    if ( !selection ) {
      if ( hex.player === currentPlayer ) {
        this.props.setSelection(hex);
        this.props.updateInfo(hex);
      } else {
        //clear selection
      }
    } else { // selection exists
      if ( hex.pos === selection.pos ) {
        // nothing happens?
      } else if ( this.isLegalMove(hex.pos) ) {
        if ( selection.pos[0] === 'reserve' ) { // DEPLOY
          this.props.deployPiece(selection, hex);
          // console.log(selection.contents);
          this.props.useEnergy(selection.contents.cost);
          this.hideReserve();
        } else { // MOVE
          this.props.movePiece(selection, hex);
        }
      }
      this.props.clearSelection();
    }
  }

  hideReserve() {
    this.props.hideReserve();
  }

  isLegalMove(pos) {
    const { selection } = this.props;
    if ( !selection ) { return false; }
    const piece = selection.contents;
    const moves = this.getLegalMoves(piece).map((m) => { return m.toString() });
    return moves.indexOf(pos.toString()) !== -1;
  }

  getLegalMoves(piece) {
    // calculates a piece's legal moves from its type
    let legalMoves = [];
    const { player1, player2, pieces } = this.props;
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
    const { player1 } = this.props;
    return player1 ? player1.info : 'placeholder';
  }

  enoughEnergy(piece) {
    const { pieces, player1 } = this.props;
    const player = player1;
    const energy = 10; // getNodeCount('P1', pieces);
    const remainingEnergy = energy - player.energy;
    return remainingEnergy >= piece.cost;
  }

  render() {
    const { player1, player2, selection, pieces } = this.props;
    const legalMoves = selection ? this.getLegalMoves(selection.contents) : [];
    const info = this.buildInfoPanel();

    return (
      <div className="game">
        <Nav options={[
            { name: 'Slot 1', handleClick: ()=> { console.log('click!') } },
            { name: 'Slot 2', handleClick: ()=> { console.log('click!') } },
            { name: 'Slot 3', handleClick: ()=> { console.log('click!') } },
            { name: 'Slot 4', handleClick: ()=> { console.log('click!') } },
            { name: 'Slot 5', handleClick: ()=> { console.log('click!') } },
            { name: 'Res', handleClick: ()=> { this.props.showReserve(); } },
          ]}
          player1={ player1 }
          pieces={ pieces }
        />
        <Board
          pieces={ pieces }
          legalMoves={ legalMoves }
          selection={ selection }
          player1={ player1 }
          player2={ player2 }
          p1Energy={ 10 }
          p2Energy={ 10 }
        />
        <InfoPanel info={ info } />
      </div>
    )
  }
}

Game.childContextTypes = {
  handleClick: React.PropTypes.func,
  hideReserve: React.PropTypes.func,
  player1: React.PropTypes.object,
  player2: React.PropTypes.object,
  deployPiece: React.PropTypes.func,
  resetEnergy: React.PropTypes.func,
};

function mapStateToProps(state) {
  const {game} = state;
  return {
    selection: game.selection,
    currentPlayer: game.currentPlayer,
    moveCount: game.moveCount,
    player1: game.player1,
    player2: game.player2,
    pieces: game.position,
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
  }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
