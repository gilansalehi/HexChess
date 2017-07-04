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
} from '../actions/gameIndex';

class GamesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };

    this.newGame = this.newGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  newGame() {
    const {postNewGame, user} = this.props;
    user ? postNewGame(user) : alert('Please log in');
  }

  joinGame(id) {
    const {joinGame, user} = this.props;
    user ? joinGame(user, id) : alert('Please log in');
  }

  render() {
    const { user, games, fetchAllGames } = this.props;
    return (
      <div>
        <GamesList games={ games }
                   newGame={ this.newGame }
                   refresh={ fetchAllGames }
                   joinGame={ this.joinGame }
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
    // actionName: action imported from ./actions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesIndex);
