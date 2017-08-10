import React, { Component, PropTypes } from 'react';

export default class MiniHex extends Component {
  constructor(props) {
    super(props)

    const { scale, color } = this.props;
    this.styles = styles(scale, color);
  }

  render() {
    const { contents, special } = this.props;
    const { hexMiniLeft, hexMiniCenter, hexMiniRight, hexMiniContainer, hexMiniContents, specialContents } = this.styles;
    return (
      <div className='hex-mini' style={ hexMiniContainer }>
        <div style={ special ? specialContents : hexMiniContents }>{ contents }</div>
        <div style={ hexMiniLeft }></div>
        <div style={ hexMiniCenter }></div>
        <div style={ hexMiniRight }></div>
      </div>
    )
  }
}

function styles(scale, color) {
  const height = scale * .866 / 2;
  const width = scale / 4;

  const hexMiniLeft = {
    display: 'inline-block',
    height: 0,
    width: 0,
    backgroundColor: 'transparent',
    borderRight: width + 'px solid ' + color,
    borderTop: height + 'px solid transparent',
    borderBottom: height + 'px solid transparent',
    borderLeft: width + 'px solid transparent',
  };

  const hexMiniCenter =  {
    display: 'inline-block',
    borderRight: width + 'px solid ' + color,
    borderTop: height + 'px solid ' + color,
    borderBottom: height + 'px solid ' + color,
    borderLeft: width + 'px solid ' + color,
  };

  const hexMiniRight = {
    display: 'inline-block',
    height: 0,
    width: 0,
    backgroundColor: 'transparent',
    borderRight: width + 'px solid transparent',
    borderTop: height + 'px solid transparent',
    borderBottom: height + 'px solid transparent',
    borderLeft: width + 'px solid ' + color,
  };

  const hexMiniContainer = {
    display: 'block',
    height: scale * .866,
    width: scale * 1.5,
    position: 'relative',
  };

  const hexMiniContents = {
    position:'absolute',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height: '100%',
    fontSize: scale / 2,
    lineHeight: scale / 2,
  };

  const specialContents = {
    position: 'absolute',
    left: '47%',
    top: '20%',
    transform: 'translateX(-50%)',
    fontSize: height * 1.5,
    lineHeight: height * 1.5 + 'px',
  };

  return { hexMiniLeft, hexMiniCenter, hexMiniRight, hexMiniContainer, hexMiniContents, specialContents };
}
