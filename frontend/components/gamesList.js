import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import GameLink from './game-link';

export default class GamesList extends Component {
  constructor(props) {
    super(props)
  }

  aiGame(user) {
    return {
      creator: '-',
      status: 'seeking',
      challenger: 'AI - lvl 1',
      winner: null,
      id: 'ai',
      created_at: new Date(),
      p1_id: user ? user.id : null,
      p2_id: 'AI',
    }
  }

  mapGamesToList(games) {
    const { user, handleClick, cancelSeek } = this.props;
    return games.map((g, i) => {
      const bgColor = i % 2 ? '#666' : '#777';
      return (
        <li key={i} style={{color:'white', backgroundColor: bgColor }}>
          <GameLink game={g} handleClick={ handleClick } cancelSeek={ cancelSeek } />
        </li>
      );
    })
  }

  render() {
    const { games, newGame, refresh, playComputer, user } = this.props;
    const gamesList = games.length ? this.mapGamesToList(games) : <span className='td-empty'>No one is playing at the moment</span>;

    return (
      <div style={{color: 'white' }}>
        <ul className='pseudo-table consolas'>
          <li key='header' className='tr consolas' style={{ backgroundColor: '#444' }}>
            <span className='td'>Creator</span>
            <span className='td'>Opponent</span>
            <span className='td'>Status</span>
            <span className='td'>Age</span>
          </li>
          <li key='playComputer' className='tr consolas' style={{ backgroundColor: 'lightseagreen'}}>
            <GameLink game={ this.aiGame(user) } handleClick={ playComputer } />
          </li>
          { gamesList }
        </ul>
        <div className="hover-hands button" onClick={ newGame }>Post Game</div>
        <div className="hover-hands button" onClick={ refresh }>Refresh List</div>
      </div>
    )
  }
}
