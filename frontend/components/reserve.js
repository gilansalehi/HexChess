import React, { Component, PropTypes } from 'react';
import Piece from './piece.js';
import Hex from './hex.js';
import MiniHex from './mini-hex.js';
import { Util } from '../utils/utils.js';

export default class Reserve extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.buildPieceList = this.buildPieceList.bind(this);
    this.hideReserve = this.hideReserve.bind(this);
    this.selectPieceFromReserve = this.selectPieceFromReserve.bind(this);
  }

  buildPieceList() {
    const { player, pieces } = this.props; // pieces = this.props[player]
    const { text } = Util;
    const nodeCount = this.context.getNodeCount(player, pieces);
    const remainingEnergy = nodeCount - player.energy;
    const thisPlayer = player.player;
    const ordering = ['node', 'pawn', 'bishop', 'rook', 'queen'];
    let pieceMap = {};
    let uniquePieces = [];
    let pieceList = pieces.filter((p) => {
      return p.player === thisPlayer && p.pos === 'reserve'
    }).sort((a, b) => ordering.indexOf(a.type) <= ordering.indexOf(b.type) ? -1 : 1);

    pieceList.forEach((p) => {
      if ( !pieceMap[p.type] ) { pieceMap[p.type] = 0; uniquePieces.push(p); }
      pieceMap[p.type] += 1;
    });

    const list = uniquePieces.map((piece, i) => {
      const contents = piece.type === 'node' ? text('infinity') : 'x' + pieceMap[piece.type];
      const special = piece.type === 'node';
      return (
        <li className='reserve-li clearfix' key={ i }>
          <div className={(piece.cost > remainingEnergy) ? 'grayed-out' : 'hidden'} title='Insufficient Energy'></div>
          <div className='reserve-energy-cost' title='Energy Cost'>
            <strong className='reserve-energy-cost-value' >{ piece.cost }</strong>
          </div>
          <div className='reserve-hex-holder clearfix'>
            <Hex
              key={ i }
              pos={ ['reserve'] }
              contents={ piece }
            />
          </div>
          <div className='reserve-counter-positioner' title='Copies in Reserve'>
            <MiniHex contents={ contents } scale={ 40 } color={ '#39b' } special={ special } />
          </div>
        </li>
      );
    });
    return list;
  }

  hideReserve() {
    this.context.hideReserve();
  }

  selectPieceFromReserve(hex) {
    // const piece = hex.state.contents;
    // this.props.setSelection(piece);
    // this.hideReserve();
  }

  render() {
    // this is the player's reserve units...
    const list = this.buildPieceList();
    const { pieces, reserve, showReserve } = this.props;

    return (
      <div className={ "reserve " + (showReserve ? "reserveSlideIn" : "") }>
        RESERVE
        <span className="hide-reserve hover-hands" onClick={ this.hideReserve }>
           ×
         </span>
        <ul style={{ listStyle: 'none' }}>
          { list }
        </ul>
      </div>
    )
  }
}

Reserve.contextTypes = {
  hideReserve: React.PropTypes.func,
  deployPiece: React.PropTypes.func,
  getNodeCount: React.PropTypes.func,
};
