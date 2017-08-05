import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';
import Hex from './hex';
import Piece from './piece';
import VsBox from './vsBox';

export default class InfoPanel extends Component {
  constructor(props) {
    super(props)

    this.styles = styles();
    this.buildImage = this.buildImage.bind(this);
    this.buildText = this.buildText.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  buildImage() {
    const {info} = this.props;
    const {image} = this.styles;
    return (
      <img src={ info.image } style={ image } width='100%' height='auto' />
    )
  }

  buildText(text) {
    if (!text.length) { return (<div>Move Log</div>); }
    return text.map((t, i) => {
      const action = t.start.toString() === 'reserve' ? 'deployed' : 'moved';
      const color = t.player === 'P1' ? 'skyblue' : 'palevioletred';
      return (
        <p key={i} style={{color}}>{`${t.player} ${action} a ${t.type} to ${t.end.map(x=>x+5)}`}</p>
      );
    });
  }

  getInfo(selection) {
    if ( !selection ) { return 'Selection Info: (Nothing Selected)'; }
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
    const { info, currentPlayer, remainingEnergy, remainingActions, game, gameInfo } = this.props;
    const { image, text, container, flexPositioner, vsBox } = this.styles;
    const displayText = this.buildText(game.moveHistory);
    const userStatus = game.player.player === 'observer' ? 'observing'    :
                       game.player.player === 'P1'       ? 'playing Blue' :
                                                           'playing Red';
    const hexSize = window.innerHeight / 5;
    const selectionImage = (
      <Hex noGlow pos={['info']}
        size={ window.innerHeight / 7 }
        contents={game.selection && game.selection.contents}
        handleClick={ e => false }
      />
    );
    const winnerColor = game.winner === 'P1' ? 'Blue' :
                        game.winner === 'P2' ? 'Red'  :
                        '#666';

    return (
      <div className='info-panel' style={ container }>
        <div style={ flexPositioner }>
          <div key={1} className='info-block'>
            <h3 style={{margin: 0}}>Info</h3>
          </div>
          <div key={2} className='game-info clearfix'>
            <VsBox gameInfo={gameInfo} hexSize={hexSize} />
          </div>
          <div key={3} className='info-block' style={{ background: winnerColor }}>
            { game.winner ? `${winnerColor} wins!` : `You are ${userStatus}`}
          </div>
          <div key={4} className='info-block'>
            <div className='hex-positioner' style={{float:'right', marginRight: `-${hexSize / 4}px`}}>
              { game.selection && selectionImage }
            </div>
            <div className='selection-info' style={{minHeight:window.innerHeight / 7 + 'px'}}>
              { this.getInfo(game.selection) }
            </div>
          </div>
          <div key={5} className='info-block move-history info-log'>
            { displayText }
          </div>
        </div>
      </div>
    )
  }
}

function styles() {
  const container = {
    display: 'block',
    float: 'left',
    position: 'relative',
    backgroundColor: '#333',
    padding: '0 10px',
    width: '300px',
    height: '100%',
    fontSize: '18px',
  };
  const text = {
    display: 'block',
    position: 'relative',
    backgroundColor: '#999',
    padding: '5px',
    marginBottom: '20px',
  };
  const image = {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: 'auto',
    margin: '0 0 10px 0',
    border: '1px solid #999',
  };
  const flexPositioner = {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  };
  const vsBox = {
    position: 'relative',
  };

  return { container, text, image, flexPositioner, vsBox };
};
