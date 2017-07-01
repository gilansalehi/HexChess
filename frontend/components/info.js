import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';

export default class InfoPanel extends Component {
  constructor(props) {
    super(props)

    this.styles = styles();
  }

  render() {
    const { info } = this.props;
    const { image, text, container, flexPositioner } = this.styles;
    return (
      <div className='info-panel' style={ container }>
        <div style={ flexPositioner }>
          <div style={ text }>
          { info.text || "INFO PANEL"}
          </div>
          <img src={ info.image } style={ image } width='100%' height='auto' />
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
    display: 'flex',
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
    flexDirection: 'column-reverse',
    height: '100%',
    width: '100%',
  };

  return { container, text, image, flexPositioner };
};
