export const fetchAllGames = () => {
  return (dispatch) => {
    dispatch(fetchGamesRequest());
    return fetchGames().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchGamesSuccess(json))
      } else {
        dispatch(fetchGamesError(json))
      }
    }
    )
  }
}

function fetchGames() {
  const URL = "/games";
  return fetch(URL, { method: 'GET'})
     .then(response => Promise.all([response, response.json()]));
}

const fetchGamesRequest = () => {
  return {
    type: "FETCH_GAMES_REQUEST"
  }
}

const fetchGamesSuccess = (payload) => {
  return {
    type: "FETCH_GAMES_SUCCESS",
    payload
  }
}

const fetchGamesError = () => {
  return {
    type: "FETCH_GAMES_ERROR"
  }
}

export const fetchGameData = (gameId) => {
  return (dispatch) => {
    dispatch(fetchGame(gameId));
    return fetchGames().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchGamesSuccess(json))
      } else {
        dispatch(fetchGamesError(json))
      }
    }
    )
  }
}

function fetchGame(id) {
  const URL = "/game/" + id;
  return fetch(URL, { method: 'GET'})
     .then(response => Promise.all([response, response.json()]));
}

// export const subscribeToUpdates = (container) => {
//   container = container || {};
//   container.cable = ActionCable.createConsumer();
//   container.games = container.cable.subscriptions.create('GamesChannel', {
//     received: function(data) {
//       return { type: 'UPDATE_RECEIVED', payload: data }
//     },
//   });
//
//   return {
//     type: 'SUBSCRIBED_TO_UPDATES',
//     payload: container
//   }
// }
//
// // Regular Redux action creator...
// function reactToUpdate(data) {
//   console.log('reactToUpdate was called');
//   return { type: 'UPDATE_RECEIVED', payload: data }
// }
