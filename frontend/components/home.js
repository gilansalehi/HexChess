import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hex from './hex';
import InnerHex from './inner-hex';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.linkTo = this.linkTo.bind(this);
  }

  linkTo(destination) {
    this.props.history.push(destination)
  }


  render() {
    const hexSize = Math.max(250, window.innerHeight / 3);
    const oddColumn = {
      width: (hexSize * .86) + 10 + 'px',
    };
    const evenColumn = {
      width: (hexSize * .86) + 10 + 'px',
      marginTop: `${hexSize/2 + 5}px`,
    };
    const marginAdder = {
      height: hexSize + 'px',
      width: hexSize + 'px',
      padding: '5px',
    }
    return (
      <div className='sixty-left center-pane' style={{fontFamily:'Cambria Math'}}>
        <div className='odd-column' style={oddColumn}>
          <div style={marginAdder}>
            <Hex noGlow={true} pos={['home']} size={hexSize} handleClick={ () => this.linkTo('/login') }>
              <InnerHex size={hexSize} background={'palevioletred'} header={'Hex Chess'}>
                <span>Hello, and welcome to Hex Chess!</span>
              </InnerHex>
            </Hex>
          </div>
          <div style={marginAdder}>
            <Hex noGlow={true} pos={['home']} size={hexSize} handleClick={ () => this.linkTo('/signup') }>
              <InnerHex size={hexSize} background={'#3689ab'}>
                <h3>What is Hex Chess?</h3>
                <span>
                  Hex Chess is a fast-paced strategy
                  game that blends the appeal of Chess
                  with the flavor and style of Magic.
                  Create a free <Link to={'/signup'} style={{textDecoration:'underline'}}>account</Link>, and play
                  a game against your
                  friends today!
                </span>
              </InnerHex>
            </Hex>
          </div>
          <div style={marginAdder}>
            <Hex noGlow={true} pos={['home']} size={hexSize} handleClick={ () => this.linkTo('/rules') }>
              <InnerHex size={hexSize} background={'#869'}>
                <h3>How do I play?</h3>
                <p>
                  The <Link to={'/rules'} style={{textDecoration:'underline'}}>rules</Link> are
                  quite simple, but the gameplay is incredibly deep and complex.  It only takes a
                  minute to learn, give it a try!
                </p>
              </InnerHex>
            </Hex>
          </div>
        </div>
        <div className='even-column' style={evenColumn}>
          <div style={marginAdder}>
            <Hex noGlow={true} pos={['home']} size={hexSize} handleClick={ () => this.linkTo('/play') }>
              <InnerHex size={hexSize} background={'lightseagreen'}>
                <h2>Play Now!</h2>
                <p>
                  Battle your friends or outwit the computer!
                </p>
              </InnerHex>
            </Hex>
          </div>
          <div style={marginAdder}>
            <Hex noGlow={true} pos={['home']} size={hexSize} handleClick={ () => this.linkTo('/play') }>
              <InnerHex size={hexSize} background={'#fc4'}>
                <h3>What Next?</h3>
                <p>
                  Hex-Chess.com is still under
                  development, but there are plenty of
                  features coming down the pipeline.
                  Full websocket support, draggable
                  pieces, and improved art
                  are all on the list.
                  Stay tuned for updates!
                </p>
              </InnerHex>
            </Hex>
          </div>
        </div>
      </div>
    )
  }
}
