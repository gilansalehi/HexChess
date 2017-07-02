export const fetchGameStateData = (gameId) => {
  return (dispatch) => {
    dispatch(fetchGameStateRequest());
    return fetchGameState(gameId).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchGameStateSuccess(json))
      } else {
        dispatch(fetchGameStateError(json))
      }
    }
    )
  }
}

function fetchGameState(id) {
  const URL = '/games' + id;
  return fetch(URL, { method: 'GET'})
     .then(response => Promise.all([response, response.json()]));
}

const fetchGameStateRequest = () => {
  return {
    type: 'FETCH_GAME_STATE_REQUEST'
  }
}

const fetchGameStateSuccess = (payload) => {
  debugger;
  return {
    type: 'FETCH_GAME_STATE_SUCCESS',
    payload
  }
}

const fetchGameStateError = (payload) => {
  return {
    type: 'FETCH_GAME_STATE_ERROR',
    payload
  }
}
