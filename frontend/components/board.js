import React, { Component, PropTypes } from 'react';
import Hex from './hex.js';
import Player from './player.js';
import EnergyCounter from './energy-counter.js';
import ReserveButton from './reserve-button.js';
import Util from '../utils/utils.js';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legalMoves: [],
    };

    this.drawBoard = this.drawBoard.bind(this);
    this.drawEnergyCounter = this.drawEnergyCounter.bind(this);
    this.drawReserveButton = this.drawReserveButton.bind(this);
    this.resetEnergy = this.resetEnergy.bind(this);
  }

  inBounds(pos) {
    const [x, y, z] = pos;
    return ( x*x < 20 && y*y < 20 && z*z < 20 );
  }

  getHeroPos(player) {
    return this.props.getHeroPos(player);
  }

  drawEnergyCounter() {
    const { player, nodeCount } = this.props;
    return (
      <EnergyCounter
        energy={ nodeCount - player.energy }
        nodeCount={ nodeCount }
      />
    );
  }

  drawReserveButton() {
    return ( <ReserveButton /> );
  }

  resetEnergy() {
    this.context.resetEnergy();
  }

  drawBoard() {
    const { pieces, selection, legalMoves, player } = this.props;

    const xnums = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    let ynums = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
    player.player === 'P1' && ynums.reverse(); // 'observer' will see from 'P2' perspective...

    const lmarr = legalMoves && legalMoves.map((arr) => { return arr.join(','); });
    const energyCount = this.drawEnergyCounter();
    const reserveButton = this.drawReserveButton();

    var self = this;
    const columns = xnums.map((x) => {
      const hexes = ynums.map((y) => {
        const z = 0 - x - y;
        if ( y*y + z*z < 41 ) { // restricts hexes to only those we want to see...
          const pos = [x, y, z];
          const key = pos.join(',');

          var contents = pieces.filter((p) => {
            if ( Array.isArray(p.pos) ) {
              return p.pos.join(',') === key;
            } else {
              return false;
            }
          })[0];
          const selected = selection && selection.pos !== 'reserve' && selection.pos.join(',') === key;
          const showLegalPip = lmarr && lmarr.indexOf(key) !== -1;

          var results;
          if ( key === '-4,-2,6' ) {
            results = <Hex key={ key }
              pos={pos} col={ x + 5 }
              contents={{ type: 'button', text: energyCount }}
              handleClick={ this.context.toggleReserve }
            />
        } else if ( key === '4,-6,2' ) {
            results = <Hex key={ key }
              pos={ pos } col={ x + 5 }
              contents={{ type: 'button', text: reserveButton }}
              handleClick={ this.context.toggleReserve }
            />
          } else {
            results = <Hex key={ key }
              pos={pos} col={ x + 5 }
              contents={ contents }
              selected={ selected }
              showLegalPip={ showLegalPip }
            />
          }

          return results;
        }
      })
      const colClass = (x + 5) % 2 === 0 ? 'even-column' : 'odd-column';
      return (
        <div key={ x + 5 } className={ colClass }>
          { hexes }
        </div>
      );
      //<Column key={ x + 5} colClass={ colClass } hexes={ hexes } />
    })
    return columns;
  }

  render() {
    const cols = this.drawBoard();

    return(
      <div className="board">
        { cols }
      </div>
    );
  }

}

Board.contextTypes = {
  resetEnergy: React.PropTypes.func,
  toggleReserve: React.PropTypes.func,
};
