import React, { Component, PropTypes } from 'react';

export default class GamesList extends Component {
  constructor(props) {
    super(props)

    this.bindFunctions();
  }

  bindFunctions() {
    this.newGame = this.newGame.bind(this);
  }

  mapGamesToList(games) {
    return games.map((g, i) => {
      return (
        <li key={i}>
            <span>{g.p1_id || 'anon ' }</span>
            <span>{g.status || 'seeking ' }</span>
            <span>{g.p2_id || 'anon ' }</span>
            <span>{g.winner || 'in progress ' }</span>
            <span>{g.created_at}</span>
        </li>
      )
    })
  }

  newGame() {
    this.props.newGame();
  }

  render() {
    const {games} = this.props;
    const gamesList = this.mapGamesToList(games);

    return (
      <div>
        <h1> Games </h1>
        <ul>
          { gamesList }
        </ul>
        <a onClick={ this.newGame }>Post Game</a>
      </div>
    )
  }
}
