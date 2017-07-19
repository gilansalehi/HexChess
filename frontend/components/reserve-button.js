import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';

export default class ReserveButton extends Component {
  constructor(props) {
    super(props)

    this.styles = styles(props.size);
  }

  render() {
    const { text } = Util;
    const { container, icon } = this.styles;

    return (
      <div className="energy-counter" style={ container }>
        <div>
          <span className="hover-bold" style={ icon }>{ text('hex') }</span>
          <div style={{ fontSize: '15px', fontFamily: 'Consolas' }}>DEPLOY</div>
        </div>
      </div>
    )
  }
}

function styles(size) {
  const container = {
    fontSize: `${.2 * size}px`,
    color: `turquoise`,
    background: `#222`,
    height: `100%`,
    textShadow: `0 0 2px #fff`,
    textAlign: `center`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  };

  const icon =  {
    fontSize: `${.6 * size}px`,
    fontFamily: `Philosopher, sans-serif`,
  };

  return { container, icon };
};
