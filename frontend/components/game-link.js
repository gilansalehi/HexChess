import React, { Component, PropTypes } from 'react';

export default class GameLink extends Component {

  render() {
    const { game } = this.props;

    return (
      <div className='game-link tr'>
        <span className='td'>{game.creator || 'anon ' }</span>
        <span className='td'>{game.status || 'seeking ' }</span>
        <span className='td'>{game.p2_id || 'anon ' }</span>
        <span className='td'>{game.winner || 'in progress ' }</span>
        <span className='td-last'>{game.created_at || ' '}</span>
      </div>
    );
  }
}
