import React, { Component, PropTypes } from 'react';
import Hex from './hex';
import MiniHex from './mini-hex';
import Piece from './piece';
import { images } from '../utils/info'

export default class VsBox extends Component {
  constructor(props) {
    super(props)

    this.nodeList = this.nodeList.bind(this);
  }

  nodeList(player) {
    const { hexSize, game } = this.props;
    var myNodes = game.position.filter(p => p.player === player && p.type === 'node');
    const capturedNodes = myNodes.filter(n => n.pos === 'prison').length;
    return [1, 2, 3].map(n => {
      const captured = n <= capturedNodes;
      const color = player === 'P1' ? (captured ? '#336' : 'blue')
                                    : (captured ? '#633'  : 'red' );
      return (
        <li key={n + color} className='clearfix' title={`Captured Nodes: ${capturedNodes}/3`}>
          <div style={{float: player === 'P1' ? 'left' : 'right', margin:'0 0 5px 0'}}>
            <MiniHex scale={hexSize / 6}
              contents={captured ? '✗' : '⎔'}
              color={color}
            />
          </div>
        </li>
      )
    });
  }

  render() {
    const { gameInfo, hexSize, pieces } = this.props;
    const { creator, challenger } = gameInfo;
    const portrait1 = (
      <Piece key={creator} options={{
        player: 'P1',
        imgUrl: images.rook,
        type: creator || 'Player 1',
        }}
      />
    );
    const portrait2 = (
      <Piece key={challenger} options={{
        player: 'P2',
        imgUrl: images.pawn,
        type: challenger || 'Player 2',
        }}
      />
    );
    return (
      <div className='vs-box' style={{width: hexSize * 2.5 + 'px', marginLeft: '-' + (hexSize * 1.25 - 150) + 'px', padding: 0, height: hexSize + 'px'}}>
        <div className='profile-container' style={{position: 'relative', width: '100%', height: '100%'}}>
          <div className='hex-positioner' style={{position: 'absolute', left: 0, top: 0}}>
            <Hex noGlow={true} pos={['info']} size={hexSize} handleClick={ () => false }>
              { portrait1 }
            </Hex>
            <ul className='clearfix node-list p1'>{ this.nodeList('P1')}</ul>
          </div>
          <span style={{position: 'absolute', bottom: 0, left: '50%', marginLeft: '-5%'}}>
            VS
          </span>
          <div className='hex-positioner' style={{position:'absolute', right: 0, top: 0}}>
            <Hex noGlow={true} pos={['info']} size={hexSize} handleClick={ () => false }>
              { portrait2 }
            </Hex>
            <ul className='clearfix node-list p2'>{ this.nodeList('P2') }</ul>
          </div>
        </div>
      </div>
    );
  }
}
