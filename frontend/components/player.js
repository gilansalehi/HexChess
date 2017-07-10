import React, { Component, PropTypes } from 'react';
import Piece from './piece';
import Reserve from './reserve';
import Hex from './hex';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      energy: 0,
      avatar: props.avatar,
      reserve: 'hidden',
      heroPos: [],
      pieces: [
        { type: 'pawn', pos: 'reserve', player: props.player },
        { type: 'pawn', pos: 'reserve', player: props.player },
        { type: 'pawn', pos: 'reserve', player: props.player },
      ],
    };
    this.player = props.player;
    this.pos = props.pos;

    this.hideReserve = this.hideReserve.bind(this);
    this.showReserve = this.showReserve.bind(this);
  }

  hideReserve() { this.setState({ reserve: 'hidden' }); }
  showReserve() { this.setState({ reserve: 'shown' }); }

  render() {
    // render the player as if he's a piece in bottom left corner.  Give him a
    // deploy icon...
    const { reserve } = this.state;
    const contents = { player: this.player, pos: this.pos, type: 'Player' };
    const pieces = this.state.pieces.filter((p) => { return p.pos === 'reserve' });

    return (
      <div className="player">
        <Hex
          pos={ this.pos }
          contents={ contents }
          selected={ reserve === 'shown' }
          handleClick={ this.showReserve }
        />
        <div className={ reserve }>
          <Reserve pieces={ pieces } hideReserve={ this.hideReserve }/>
        </div>
      </div>
    );
  }
}
