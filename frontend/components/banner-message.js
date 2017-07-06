import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';

export default class BannerMessage extends Component {
  constructor(props) {
    super(props)

    // this component is mainly for displaying GAME OVER! message.
    this.gameOver = this.gameOver.bind(this);
  }

  gameOver() {
    const { pieces } = this.props;
    const prisoners = pieces.filter(p => p.pos === 'prison');
    const capturedHeroes = prisoners.filter(p => p.type === 'hero');
    const capturedNodes = prisoners.filter(p => p.type === 'node');
    const capturedBlueNodes = capturedNodes.filter(n => n.player === 'P1');
    const capturedRedNodes  = capturedNodes.filter(n => n.player === 'P2');
    let winner = false;
    let message = '';
    if ( capturedHeroes.length ) {
      // a HERO has been captured!
      winner = capturedHeroes[0].player === 'P2' ? 'Blue' : 'Red';
      message = `${winner} wins by capturing the enemy hero!`;
    }
    if ( capturedBlueNodes.length >= 3 ) {
      winner = 'Red';
      message = 'Red wins by capturing three enemy nodes!';
    }
    if ( capturedRedNodes.length >= 3 ) {
      winner = 'Blue';
      message = 'Blue wins by capturing three enemy nodes!';
    }
    return { winner, message };
  }

  render() {
    const { pieces } = this.props;
    const { winner, message } = this.gameOver();

    return (
      <div className='banner-message' style={{ display: winner ? 'block' : 'none' }}>
        <h1>GAME OVER!</h1>
        <p>{ message }</p>
      </div>
    );
  }
}
