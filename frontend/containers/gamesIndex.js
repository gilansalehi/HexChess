import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GamesList from '../components/gamesList';
import Rules from '../components/rules';

import {
  fetchAllGames,
} from '../actions/startup';

import {
  postNewGame,
  joinGame,
  observeGame,
  updateReceived,
  createAction,
  cancelSeek,
} from '../actions/gameIndex';

class GamesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'none'
    };

    this.applyFilter = this.applyFilter.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllGames();
    // ActionCable is straight up bugged in Rails 5.  Can't use websockets until a fix is available.
    const self = this;
    if (typeof App !== 'undefined'){
      console.log(' setting up action cable on front end... ' )
      App.games = App.cable.subscriptions.create("GamesChannel", {
        connected: function() {},
        disconnected: function() {},
        received: function(data) {
          self.props.createAction(data);
        },
        speak: function(data) {
          return this.perform('speak', {
            data: data
          });
        }
      });
    }

  }

  applyFilter() {
    const { games } = this.props;
    const { filter } = this.state;
    if ( filter === 'none' ) { return games; }
    return games.filter(g => g.status === filter);
  }

  setFilter(filter) {
    this.setState({ filter });
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
    const { user, games, fetchAllGames, cancelSeek } = this.props;
    const { filter } = this.state;

    const filteredGames = this.applyFilter();
    return (
      <div className="sixty-left center-pane">

        <h1 className="header"> Games </h1>
        <div className="tab-list clearfix consolas">
          <span className={`${filter === 'none' ? '' : 'in'}active tab`}
            onClick={e => this.setFilter('none')}>All</span>
          <span className={`${filter === 'seeking' ? '' : 'in'}active tab`}
            onClick={e => this.setFilter('seeking')}>Seeking</span>
          <span className={`${filter === 'in progress' ? '' : 'in'}active tab`}
            onClick={e => this.setFilter('in progress')}>In Progress</span>
        </div>

        <GamesList games={ filteredGames }
                   newGame={ this.newGame }
                   refresh={ fetchAllGames }
                   handleClick={ this.handleClick }
                   user={ user }
                   cancelSeek={ cancelSeek }
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
    updateReceived: updateReceived,
    createAction: createAction,
    cancelSeek: cancelSeek,
    // actionName: action imported from ./actions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesIndex);
