import React, { Component, PropTypes } from 'react';

export default class Button extends Component {
  render() {
    const { text, handleClick, size, info } = this.props;
    const style = {
      height: size + 'px',
      width: size + 'px',
      lineHeight: size + 'px',
      fontSize: (size * 1.6) + 'px'
    };
    return (
      <div className='square-button'
        onClick={ handleClick }
        style={style}
        title={info}
      >
        { text }
      </div>
    );
  }
}
