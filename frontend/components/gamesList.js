import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class GamesList extends Component {

  mapGamesToList(games) {
    return games.map((g, i) => {
      return (
        <li key={i} style={{color:'white'}}>
          <Link to={ `/games/${g.id}` } >
            <span>{g.creator || 'anon ' }</span>
            <span>{g.status || 'seeking ' }</span>
            <span>{g.p2_id || 'anon ' }</span>
            <span>{g.winner || 'in progress ' }</span>
            <span>{g.created_at}</span>
          </Link>
        </li>
      );
    })
  }

  render() {
    const { games, newGame, refresh } = this.props;
    const gamesList = this.mapGamesToList(games);

    return (
      <div style={{color: 'white'}}>
        <h1> Games </h1>
        <ul>
          { gamesList }
        </ul>
        <div className="hover-hands" onClick={ newGame }>Post Game</div>
        <div className="hover-hands" onClick={ refresh }>Refresh List</div>
      </div>
    )
  }
}
