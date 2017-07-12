import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Button from './button';

export default class GameLink extends Component {

  render() {
    const { game: {
      creator, status, challenger, winner, id, created_at, p1_id, p2_id
    } } = this.props;

    const minutesAgo = Math.floor(
      (Date.now() - new Date(created_at).valueOf()) / 60000
    );

    const user = this.context.getUser();
    const creatorButtons = (
      <span className='game-link-buttons'>
        <Button text={'×'}
          info={'cancel'}
          handleClick={ () => this.props.cancelSeek(id) }
          size={15}
        />
      </span>
    );

    return (
      <div className='tr'>
        <span className='game-link'>
        <Link to={ `/games/${id}` } onClick={ () => this.props.handleClick(id) }>
          <span className='td'>{ creator || 'anon ' }</span>
          <span className='td'>{ challenger || '-' }</span>
          <span className='td'>{ status }</span>
          <span className='td'>{ minutesAgo + ' mins' || '-'}</span>
        </Link>
        </span>
        { user && user.id === p1_id && status === 'seeking' && creatorButtons }
      </div>
    );
  }
}


GameLink.contextTypes = {
  getUser: React.PropTypes.func,
};
