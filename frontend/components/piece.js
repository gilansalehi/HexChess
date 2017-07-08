import React, { Component, PropTypes } from 'react';

export default class Piece extends Component {
  constructor(props) {
    super(props);

    var options = props.options;

    this.state = { pos: options.pos };
    this.type = options.type;
    this.player = options.player || 'P1';
    this.imgUrl = options.imgUrl || '#';
    this.color = options.player === 'P1' ? 'blue' : 'red';

    this.legalMoves = this.legalMoves.bind(this);
    this.getAdjacentHexes = this.getAdjacentHexes.bind(this);
  }

  legalMoves() {
    // var legalMoves = [];
    // this.moveDirs.forEach((dir) => {
    //
    // })
    const pos = this.state.pos;
    // if pos === 'reserve' legalMoves === hero.adjacent squares
    return this.getAdjacentHexes(pos);
  }

  getAdjacentHexes(pos) {
    const [x, y, z] = pos;
    return [
      [x - 1, y + 1, z], [x, y + 1, z - 1],
      [x - 1, y, z + 1], [x + 1, y, z - 1],
      [x, y - 1, z + 1], [x + 1, y - 1, z],
    ];
  }

  render() {
    const imgUrl = this.imgUrl
    const color = this.player === 'P1' ? 'blue' : 'red'

    return (
      <div className={"piece " + this.player } style={{ background: this.color }}>
        <img src={ imgUrl } />
        <span className="piece-label"
          style={{ color: 'white', backgroundColor: color }}>
          <strong>{ this.type }</strong>
        </span>
      </div>
    )
  }
}
