import React, { Component, PropTypes } from 'react';
import Piece from './piece.js';
import Player from './player.js';

export default class Hex extends Component {
  constructor(props) {
    super(props);

    this.pos = props.pos;
    this.address = props.pos.map((i) => { return i + 5; });
    this.color = this.getColorFromPos(props.pos, props.col);
    this.onBoard = this.color !== '#333';
    this.state = {
      highlight: false, // props.highlight for showing legal moves...
      hover: false,
      contents: props.contents,
      selected: props.selected,
    };

    this.data = this.data.bind(this);
    this.getColorFromPos = this.getColorFromPos.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.highlightHex = this.highlightHex.bind(this);
    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.unHighlightHex = this.unHighlightHex.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const oldState = this.state;
    const newState = Object.assign({}, oldState, newProps);
    this.setState(newState);
  }

  data() {
    const { pos, contents } = this.props;
    const player = contents && contents.player;
    return { pos, contents, player };
  }

  getColorFromPos(pos, col) {
    if ( typeof pos !== 'object' ) { return '#333'; }
    const [x, y, z] = pos;
    const colors = ['#8ac', '#abc', '#def'];
    var idx = (10 + y + 2*(x+4)) % 3;

    if ( y*y > 20 || z*z > 20) { idx = 9; }

    return colors[idx] || '#333';
  }

  getAdjacentHexes(pos) {
    const [x, y, z] = pos;
    return [
      [x - 1, y + 1, z], [x, y + 1, z - 1],
      [x - 1, y, z + 1], [x + 1, y, z - 1],
      [x, y - 1, z + 1], [x + 1, y - 1, z],
    ];
  }

  handleClick(proxy, evt, context) {
    const hex = this;
    // pass forward all necessary click details here...
    this.props.handleClick && this.props.handleClick();
    this.context.handleClick(hex.data());
  }

  hoverOn() {
    // emit an action that turns off other hovers?
    this.setState({ hover: true });
  }

  hoverOff() {
    this.setState({ hover: false });
  }

  highlightHex() {
    const toggle = !this.state.highlight;
    this.setState({ highlight: toggle });
  }

  unHighlightHex() {
    this.setState({ highlight: false });
  }

  render() {
    const placeholder = "#";
    const { highlight, hover, selected } = this.state;
    const { contents, showLegalPip } = this.props;
    const onBoard = this.onBoard;
    const triangleClass = hover ? "sslideIn" : (selected ? "selected" : "hidden");

    var myStuff = [];
    if ( contents ) {
      if ( contents.type === 'button' ) {
        myStuff = <span className="hex-text">{ contents.text }</span>
      } else { //it's a piece
        myStuff = <Piece options={ contents } />;
      }
    } else {
      myStuff = <span style={{
        color: '#333',
        display: showLegalPip ? 'none' : 'flex',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        fontSize: '18px',
        marginTop: '36px',
        opacity: '.3',
      }}>
        { this.address.join('-') }
      </span>
    }

    return (
      <div className="hex" id={ this.pos.toString() }>
        <div className="slant1">
          <div className="slant1">
            <div className="hex-inner" style={{ background: this.color }}>
              <div className="hex-contents">
                { myStuff }
              </div>
              <div className="hitbox one" onClick={ () => { this.handleClick() } }
                onMouseEnter={ this.hoverOn }
                onMouseLeave={ this.hoverOff }>
                <div className={ onBoard && showLegalPip ? 'legalPip' : 'hidden' } />
                <div className={ "selector-triangles " + (triangleClass) }></div>
              </div>
              <div className="hitbox two" onClick={ () => { this.handleClick() } }
                onMouseEnter={ this.hoverOn }
                onMouseLeave={ this.hoverOff }>
                <div className={ "selector-triangles " + (triangleClass) }></div>
              </div>
              <div className="hitbox three" onClick={ () => { this.handleClick() } }
                onMouseEnter={ this.hoverOn }
                onMouseLeave={ this.hoverOff }>
                <div className={ "selector-triangles " + (triangleClass) }></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Hex.contextTypes = {
  handleClick: React.PropTypes.func,
};
