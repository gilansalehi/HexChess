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
    const { player1, pieces } = this.props; // pieces = this.props[player]
    const { text } = Util;
    const player = 'P1';

    let pieceMap = {};
    let uniquePieces = [];
    let pieceList = pieces.filter((p) => {
      return p.player === player && p.pos === 'reserve'
    });

    pieceList.forEach((p) => {
      if ( !pieceMap[p.type] ) { pieceMap[p.type] = 0; uniquePieces.push(p); }
      pieceMap[p.type] += 1;
    });

    const list = uniquePieces.map((piece, i) => {
      const contents = piece.type === 'node' ? text('infinity') : 'x' + pieceMap[piece.type];
      const special = piece.type === 'node';
      return (
        <li className='reserve-li clearfix' key={ i }>
          <div className='reserve-energy-cost'>
            <strong className='reserve-energy-cost-value'>{ piece.cost }</strong>
          </div>
          <div className='reserve-hex-holder clearfix'>
            <Hex
              key={ i }
              pos={ ['reserve'] }
              contents={ piece }
            />
          </div>
          <div className='reserve-counter-positioner'>
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
    // debugger;
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
};
