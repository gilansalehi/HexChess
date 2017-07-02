export const postGameStateData = (gameId) => {
  return (dispatch) => {
    dispatch(postGameStateRequest());
    return postGameState(gameId).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(postGameStateSuccess(json))
      } else {
        dispatch(postGameStateError(json))
      }
    }
    )
  }
}

function postGameState(id) {
  const URL = '/games' + id;
  // NOTE: will need csrf tokens
  return fetch(URL, { method: 'POST'})
     .then(response => Promise.all([response, response.json()]));
}

const postGameStateRequest = () => {
  return {
    type: 'POST_GAME_STATE_REQUEST'
  }
}

const postGameStateSuccess = (payload) => {
  return {
    type: 'POST_GAME_STATE_SUCCESS',
    payload
  }
}

const postGameStateError = (payload) => {
  return {
    type: 'POST_GAME_STATE_ERROR',
    payload
  }
}
