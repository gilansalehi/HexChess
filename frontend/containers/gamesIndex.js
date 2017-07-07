import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GamesList from '../components/gamesList';

import {
  fetchAllGames,
} from '../actions/startup';

import {
  postNewGame,
  joinGame,
  observeGame,
} from '../actions/gameIndex';

class GamesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };

    this.newGame = this.newGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllGames();
  }

  newGame() {
    const {postNewGame, user} = this.props;
    user ? postNewGame(user) : alert('Please log in');
  }

  handleClick(id) {
    const {user, games, joinGame, observeGame} = this.props;
    const game = games.filter(g => g.id === id)[0];
    if ( !user ) {
      observeGame(id);
    } else if ( user.id === game.p1_id ) {
      joinGame({ p1_id: user.id }, id);
    } else if ( user.id === game.p2_id ) {
      joinGame({ p2_id: user.id }, id);
    } else if ( !game.p2_id ) {
      joinGame({ p2_id: user.id, status: 'in progress' }, id);
    } else {
      observeGame(id)
    }
  }

  render() {
    const { user, games, fetchAllGames } = this.props;
    return (
      <div className="sixty-left">
        <GamesList games={ games }
                   newGame={ this.newGame }
                   refresh={ fetchAllGames }
                   handleClick={ this.handleClick }
                   user={ user }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    games: state.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllGames: fetchAllGames,
    postNewGame: postNewGame,
    joinGame: joinGame,
    observeGame: observeGame,
    // actionName: action imported from ./actions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesIndex);
