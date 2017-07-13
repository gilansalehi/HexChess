import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';

export default class ReserveButton extends Component {
  constructor(props) {
    super(props)

    this.styles = styles();
  }

  render() {
    const { text } = Util;
    const { container, icon } = this.styles;

    return (
      <div className="energy-counter" style={ container }>
        <span className="hover-bold" style={ icon }>{ text('hex') }</span>
        <div style={{ fontSize: '15px' }}>Deploy</div>
      </div>
    )
  }
}

function styles() {
  const container = {
    fontSize: '18px',
    color: 'turquoise',
    margin: '10px 0',
    textShadow: '0 0 2px #fff',

  };
  const icon =  {
    fontSize: '60px',
    fontFamily: 'Philosopher, sans-serif',
  };

  return { container, icon };
};
