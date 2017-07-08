import $ from 'jquery';

export const postNewGame = (currentUser) => {
  return (dispatch) => {
    dispatch(postNewGameRequest());
    return postGame(currentUser, dispatch)
  }
}

function postGame(currentUser, dispatch) {
  $.ajax({
    type: 'POST',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    url: '/games',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
      game: {
        status: 'seeking',
        creator_id: currentUser.id,
        p1_id: currentUser.id,
        position: 'DEFAULT_POSITION',
      }
    }),
    success: function(json) {
      dispatch({ type: 'POST_NEW_GAME_SUCCESS', payload: json });
    },
    error: function(msg) {
      dispatch({ type: 'POST_NEW_GAME_ERROR', payload: msg });
    }
  });
}

const postNewGameRequest = () => {
  return {
    type: "POST_NEW_GAME_REQUEST"
  }
}

const postNewGameSuccess = (payload) => {
  return {
    type: "POST_NEW_GAME_SUCCESS",
    payload
  }
}

const postNewGameError = () => {
  return {
    type: "POST_NEW_GAME_ERROR"
  }
}

export const joinGame = (userData, gameId) => {
  return (dispatch) => {
    dispatch({ type: 'JOIN_GAME_REQUEST' });
    return $.ajax({
      type: 'PUT',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: '/games/' + gameId,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ game: userData }),
      success: function(json) {
        dispatch({ type: 'JOIN_GAME_SUCCESS', payload: json });
      },
      error: function(msg) {
        dispatch({ type: 'JOIN_GAME_SUCCESS', payload: msg });
      }
    });
  }
}

export const observeGame = (gameId) => {
  return (dispatch) => {
    dispatch({ type: 'OBSERVE_GAME_REQUEST' });
    return $.ajax({
      type: 'GET',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: '/games/' + gameId,
      dataType: 'json',
      contentType: 'application/json',
      success: function(json) {
        dispatch({ type: 'OBSERVE_GAME_SUCCESS', payload: json });
      },
      error: function(msg) {
        dispatch({ type: 'OBSERVE_GAME_SUCCESS', payload: msg });
      }
    });
  }
}