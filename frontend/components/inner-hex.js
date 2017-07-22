import React, { Component, PropTypes } from 'react';
import { Util } from '../utils/utils.js';

export default class InnerHex extends Component {
  constructor(props) {
    super(props)

    const { size, background } = props;
    this.styles = styles(size, background);
  }

  mapTextToHexShape() {
    const { text, size } = this.props;
    // 1. Calculate the number of lines
    const maxLines = Math.floor(size / 20); // 20 px per line
    const maxWidth = size; // longest line at center of hex
    const minWidth = size / 1.732; // shortest line, top or bottom of hex;
    const longestLineLetterBudget = Math.floor(size/8.7); // 8.7 is approx letter width
    const shortestLineLetterBudget = Math.floor(minWidth/8.7);
    // lines alternate with 3 fewer then 2 fewer letters than the line before
    // determine starting line by starting at center and counting back...
    const linesAboveMiddle = (() => {
      let mid = text.length / 2; // start in the middle
      mid -= (longestLineLetterBudget / 2); // knock off the half of center line
      let lines = 0;
      while (mid > 0) {
        mid -= (longestLineLetterBudget - 2.5 * lines);
        lines ++;
      }
      return lines;
    })();
    if ( linesAboveMiddle < 1 ) { return <span>{ text }</span>; } // no need to add breakpoints

    const firstLineLetterBudget = Math.floor(longestLineLetterBudget - 2.5 * linesAboveMiddle);
    const words = text.split(' ');
    let results = [];
    let currentBuffer = [];
    let currentLineLetterBudget = firstLineLetterBudget;
    let linesBuffered = 0;
    words.forEach(word => {
      const currentString = currentBuffer.join(' ');
      const nextWordWillFit = currentString.length + word.length + 1 < currentLineLetterBudget;
      if ( !nextWordWillFit ) {
        results.push(<div>{ currentString }</div>);
        currentBuffer = [];
        linesBuffered += 1;
        currentLineLetterBudget = Math.max(
          (currentLineLetterBudget + (2.5 * ( linesBuffered <= linesAboveMiddle ? 1 : -1 ))),
          shortestLineLetterBudget
        );
      }
      currentBuffer.push(word);
    });
    results.push(<div>{ currentBuffer.join(' ') }</div>);
    return results;
  }

  render() {
    const { header, text } = this.props;
    return (
      <div className="inner-hex" style={ this.styles.container }>
        <div>
          <span style={ this.styles.header }>{ header }</span>
          <span style={ this.styles.text }>
            <div className="hex-shaped-text">
              { this.props.children || this.mapTextToHexShape(text) }
            </div>
          </span>
        </div>
      </div>
    )
  }
}

function styles(size, background =  '#222') {
  const container = {
    color: 'white',
    background: background,
    height: `100%`,
    textAlign: `center`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  };

  const header = {
    display: 'block',
    fontSize: `${size / 6}px`,
  };

  const text = {
    display: 'block',
    maxWidth: `${.8 * size}px`,
  };

  return { container, header, text };
};
