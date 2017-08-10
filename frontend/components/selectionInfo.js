import React, { Component } from 'react';
import Hex from './hex';

export default class SelectionInfo extends Component {
  constructor(props) {
    super(props);

    this.getInfo = this.getInfo.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.selection !== this.props.selection;
  }

  getInfo(selection) {
    const hints = [
      'Capture the enemy hero to win the game.',
      'You can win by capturing three enemy power nodes',
      'You will need power nodes to deploy your more powerful pieces',
      "You're doing great!",
      'A piece cannot move twice in a turn',
      'A piece cannot move the same turn it is deployed',
      'Your hero can move and still deploy a piece, or deploy then move',
      'Be careful not to box your hero in with your own pieces',
      'Deploying a pawn is often the best way to block an attack on your hero',
      'The orange circle above a piece in the reserve displays the energy cost to deploy it',
    ];

    if ( !selection ) {
      return (
        <div>
          <div>Selection Info: (Nothing Selected)</div>
          <div style={{marginTop:'10px'}}>
            Hint: { hints[Math.floor( Math.random() * hints.length )] }
          </div>
        </div>
      );
    }

    const infoBlock = {
      hero:    'Heroes can move and capture one hex in any direction, and deploy pieces to any vacant adjacent hex.',
      pawn:    'Pawns can move one hex straight forward, and capture one hex diagonally forward.',
      bishop:  'Bishops may move and capture in an X shape.',
      rook:    'Rooks may move and capture in an inverted Y shape.',
      queen:   'Queens may move and capture in a straight line in any direction.',
      blueGem: 'Nodes cannot move.  Nodes provide energy needed to deploy your pieces.',
      node:    'Nodes cannot move.  Nodes provide energy needed to deploy your pieces.',
    };
    return <div style={{textAlign:'left'}}>{ infoBlock[selection.contents.type] }</div>;
  }

  render() {
    const { selection, hexSize } = this.props;
    const selectionImage = (
      <Hex noGlow pos={['info']}
        size={ window.innerHeight / 7 }
        contents={selection && selection.contents}
        handleClick={ e => false }
      />
    );

    return (
      <div>
        <div className='hex-positioner' style={{float:'right', marginRight: `-${hexSize / 4}px`}}>
          { selection && selectionImage }
        </div>
        <div className='selection-info' style={{minHeight:window.innerHeight / 7 + 'px'}}>
          { this.getInfo(selection) }
        </div>
      </div>
    )
  }
}
