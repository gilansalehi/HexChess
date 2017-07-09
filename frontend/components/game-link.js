import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

export default class GameLink extends Component {

  render() {
    const { game: {
      creator, status, challenger, winner, id, created_at, p1_id, p2_id
    } } = this.props;

    return (
      <div className='game-link tr'>
        <span className='td'>{ creator || 'anon ' }</span>
        <span className='td'>{ challenger || '-' }</span>
        <span className='td'>{ status }</span>
        <span className='td'>{ created_at || '-'}</span>
      </div>
    );
  }
}
