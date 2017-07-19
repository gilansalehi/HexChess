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

  drawEnergyCounter(size) {
    const { player, nodeCount } = this.props;
    return (
      <EnergyCounter
        size={size}
        energy={ nodeCount - player.energy }
        nodeCount={ nodeCount }
      />
    );
  }

  drawReserveButton(size) {
    return ( <ReserveButton size={size} /> );
  }

  resetEnergy() {
    this.context.resetEnergy();
  }

  drawBoard(hexSize) {
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
          return (
            <Hex key={ key }
              size={hexSize}
              pos={pos} col={ x + 5 }
              contents={ contents }
              selected={ selected }
              showLegalPip={ showLegalPip }
            />
          );
        }
      })
      const colClass = (x + 5) % 2 === 0 ? 'even-column' : 'odd-column';
      const colStyle = {
        width: (hexSize * .86) + 'px',
        marginTop: (colClass === 'even-column' ? `${hexSize/2}px` : 0),
      };
      return (
        <div key={ x + 5 } className={ colClass } style={ colStyle }>
          { hexes }
        </div>
      );
    })
    return columns;
  }

  render() {
    const hexSize = window.innerHeight / 9;
    const cols = this.drawBoard(hexSize);
    const energyCounter = this.drawEnergyCounter(hexSize);
    const reserveButton = this.drawReserveButton(hexSize);

    return(
      <div className="board">
        <div>
        { cols }
        </div>
        <div className='energy-info overlay'>
          <Hex pos={[11,11,11]} size={hexSize * 1.5}>
            { energyCounter }
          </Hex>
        </div>
        <div className='reserve-info overlay'>
          <Hex pos={[11,11,11]} size={hexSize * 1.5}
            handleClick={ this.context.toggleReserve }>
            { reserveButton }
          </Hex>
        </div>
      </div>
    );
  }

}

Board.contextTypes = {
  resetEnergy: React.PropTypes.func,
  toggleReserve: React.PropTypes.func,
};
