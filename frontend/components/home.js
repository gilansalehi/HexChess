import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className='sixty-left center-pane' style={{fontFamily:'Cambria Math'}}>
        <h1 className='header'>Hex Chess</h1>
        <p className='sub-header'>Hello, and welcome to Hex Chess!</p>

        <h3>What is Hex Chess?</h3>
        <p>
          Hex Chess was designed, developed, and coded by Gilan Salehi as a fast-paced strategy game that
          blended the appeal of board games like Chess and Arimaa with the flavor and style of card games
          like Magic and Hearthstone.  Hex-Chess is a pure strategy game, meaning it contains no random elements:
          your skill and your skill alone will determine who wins a game of Hex Chess.
        </p>

        <h3>How do I play?</h3>
        <p>
          The <Link to={'/rules'} style={{textDecoration:'underline'}}>rules</Link> are very simple, but the gameplay is incredibly deep and complex.
          Create a free <Link to={'/signup'} style={{textDecoration:'underline'}}>account</Link>, and challenge your friends to a game today!
        </p>

        <h3>What next?</h3>
        <p>
          Hex-Chess.com is still under development, but there are plenty of features coming down the pipeline.
          Support for websockets, draggable/droppable pieces, and improved piece images are all on the list.
          Stay tuned for updates!  Also, feel free to email gilansalehi@gmail.com with questions, suggestions,
          or feature requests.
        </p>
      </div>
    )
  }
}
