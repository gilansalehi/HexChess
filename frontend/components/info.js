import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';

export default class InfoPanel extends Component {
  constructor(props) {
    super(props)

    this.styles = styles();
    this.buildImage = this.buildImage.bind(this);
    this.buildText = this.buildText.bind(this);
  }

  buildImage() {
    const {info} = this.props;
    const {image} = this.styles;
    return (
      <img src={ info.image } style={ image } width='100%' height='auto' />
    )
  }

  buildText(text) {
    if (!text) { return false }
    return text.map((blob, i) => {
      return (
        <p key={i}>{blob.text}</p>
      );
    });
  }

  render() {
    const { info, currentPlayer, remainingEnergy, remainingActions, game, gameInfo } = this.props;
    const { image, text, container, flexPositioner } = this.styles;
    const displayText = this.buildText(info);
    const userStatus = game.player === 'observer' ? 'observing' :
                       game.player === 'P1' ? 'playing Blue' : 'playing Red';

    return (
      <div className='info-panel' style={ container }>
        <div style={ flexPositioner }>
          <div className='game-info'>
            <span>You are { userStatus }</span>
            <br></br>
            <span style={{color: 'blue', fontSize: '24px' }}>
              { gameInfo ? gameInfo.creator : 'loading...' }
            </span>
            <span> vs. </span>
            <span style={{color: 'red', fontSize: '24px' }}>
              { gameInfo ? gameInfo.challenger : 'waiting...' }
            </span>
          </div>
          <div className='info-log'>
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
    backgroundColor: '#666',
    padding: '10px',
    width: '300px',
    height: '100%',
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

  return { container, text, image, flexPositioner };
};
