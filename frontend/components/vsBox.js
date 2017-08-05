import React, { Component, PropTypes } from 'react';
import Hex from './hex';
import Piece from './piece';
import { images } from '../utils/info'

export default class VsBox extends Component {

  render() {
    const { gameInfo, hexSize } = this.props;
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
          </div>
          <span style={{position: 'absolute', bottom: 0, left: '50%', marginLeft: '-5%'}}>
            VS
          </span>
          <div className='hex-positioner' style={{position:'absolute', right: 0, top: 0}}>
            <Hex noGlow={true} pos={['info']} size={hexSize} handleClick={ () => false }>
              { portrait2 }
            </Hex>
          </div>
        </div>
      </div>
    );
  }
}
