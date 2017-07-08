import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import GameLink from './game-link';

export default class GamesList extends Component {
  constructor(props) {
    super(props)
  }

  mapGamesToList(games) {
    return games.map((g, i) => {
      const bgColor = i % 2 ? '#666' : '#777';
      return (
        <li key={i} style={{color:'white', backgroundColor: bgColor }}>
          <Link to={ `/games/${g.id}` } onClick={ () => this.props.handleClick(g.id) }>
            <GameLink game={g} />
          </Link>
        </li>
      );
    })
  }

  render() {
    const { games, newGame, refresh } = this.props;
    const gamesList = this.mapGamesToList(games);

    return (
      <div style={{color: 'white' }}>
        <h1> Games </h1>
        <ul className='pseudo-table'>
          <li key='header' className='tr' style={{ backgroundColor: '#444', textAlign: 'center' }}>
            <span className='td'>Creator</span>
            <span className='td'>Seeking</span>
            <span className='td'>Opponent</span>
            <span className='td'>Status</span>
            <span className='td'>Timestamp</span>
          </li>
          { gamesList }
        </ul>
        <div className="hover-hands button" onClick={ newGame }>Post Game</div>
        <div className="hover-hands button" onClick={ refresh }>Refresh List</div>
      </div>
    )
  }
}
