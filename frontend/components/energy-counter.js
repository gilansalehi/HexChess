import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';

export default class EnergyCounter extends Component {
  constructor(props) {
    super(props)
    this.styles = styles();
  }

  render() {
    const { text } = Util;
    const { energy, nodeCount } = this.props;
    const { container, remaining, total } = this.styles;
    const showTotal = energy === nodeCount ? text('energy') : '/' + nodeCount;
    return (
      <div className="energy-counter" style={ container }>
        <span style={ remaining }>{ energy }</span>
        <span style={ total }>{ showTotal }</span>
        <div style={{ fontSize: '16px' }}>Energy</div>
      </div>
    )
  }
}

function styles() {
  const container = {
    fontSize: '18px',
    color: '#fa0',
    margin: '10px 0',
    textShadow: '0 0 2px #fff',

  };
  const remaining =  {
    fontSize: '60px',
    fontWeight: 'bold',
    marginLeft: '10px',
    fontFamily: 'Philosopher, sans-serif',
  };
  const total = {
    fontSize: '18px',
    width: '20px',
  };

  return { container, remaining, total };
};
