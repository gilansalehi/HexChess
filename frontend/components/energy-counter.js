import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';

export default class EnergyCounter extends Component {
  constructor(props) {
    super(props)

    this.styles = styles(props.size);
  }

  render() {
    const { text } = Util;
    const { energy, nodeCount, size } = this.props;
    const { container, remaining, total } = this.styles;
    const showTotal = energy === nodeCount ? text('energy') : '/' + nodeCount;
    return (
      <div className="energy-counter" style={ container }>
        <div>
          <span style={ remaining }>{ energy }</span>
          <span style={ total }>{ showTotal }</span>
          <div style={{ fontSize: '16px' }}>Energy</div>
        </div>
      </div>
    )
  }
}

function styles(size) {
  const container = {
    fontSize: `${.2 * size}px`,
    color: `#fa0`,
    background: `#222`,
    height: `100%`,
    textShadow: `0 0 2px #fff`,
    textAlign: `center`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  };
  const remaining =  {
    fontSize: `${.6 * size}px`,
    fontWeight: `bold`,
    marginLeft: `10px`,
    fontFamily: `Philosopher, sans-serif`,
  };
  const total = {
    fontSize: `${.2 * size}px`,
    width: `${.2 * size}px`,
  };

  return { container, remaining, total };
};
