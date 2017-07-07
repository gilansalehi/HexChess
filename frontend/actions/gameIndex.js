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
    data: JSON.stringify(
      { game: {
        status: 'seeking',
        creator_id: currentUser.id,
        p1_id: currentUser.id,
        position: {
          currentPlayer: 'P1',
          actions: 1,
          pieces: DEFAULT_POSITION
        },
      } }),
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

const DEFAULT_POSITION = JSON.stringify(
[{"type":"hero","player":"P1","cost":0,"ready":true,"pos":[0,-3,3],"moveDirs":["adjacent"],"imgUrl":"http://cdn.paper4pc.com/images/fantasy-art-knight-warrior-horses-armor-wallpaper-1.jpg"},{"type":"queen","player":"P1","cost":6,"ready":true,"pos":"reserve","moveDirs":["queen"],"imgUrl":"http://img06.deviantart.net/23d8/i/2015/031/e/a/the_evil_queen_by_hexe_cobalt-d5g7rd0.jpg"},{"type":"pawn","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"bishop","player":"P1","cost":2,"ready":true,"pos":"reserve","moveDirs":["bishop"],"imgUrl":"https://s-media-cache-ak0.pinimg.com/originals/f0/34/df/f034df7627b5cb4dbef613bcb504482b.jpg"},{"type":"bishop","player":"P1","cost":2,"ready":true,"pos":"reserve","moveDirs":["bishop"],"imgUrl":"https://s-media-cache-ak0.pinimg.com/originals/f0/34/df/f034df7627b5cb4dbef613bcb504482b.jpg"},{"type":"rook","player":"P1","cost":3,"ready":true,"pos":"reserve","moveDirs":["rook"],"imgUrl":"http://wallup.net/wp-content/uploads/2016/04/10/297431-fantasy_armor-fantasy_art-sword-knight-angel_wings.png"},{"type":"rook","player":"P1","cost":3,"ready":true,"pos":"reserve","moveDirs":["rook"],"imgUrl":"http://wallup.net/wp-content/uploads/2016/04/10/297431-fantasy_armor-fantasy_art-sword-knight-angel_wings.png"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P1","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"hero","player":"P2","cost":0,"ready":true,"pos":[0,3,-3],"moveDirs":["adjacent"],"imgUrl":"http://cdn.paper4pc.com/images/fantasy-art-knight-warrior-horses-armor-wallpaper-1.jpg"},{"type":"queen","player":"P2","cost":6,"ready":true,"pos":"reserve","moveDirs":["queen"],"imgUrl":"http://img06.deviantart.net/23d8/i/2015/031/e/a/the_evil_queen_by_hexe_cobalt-d5g7rd0.jpg"},{"type":"pawn","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"pawn","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["pawn"],"imgUrl":"http://www.wallpaperbetter.com/wallpaper/84/539/806/fantasy-art-armor-knight-1080P-wallpaper-middle-size.jpg"},{"type":"bishop","player":"P2","cost":2,"ready":true,"pos":"reserve","moveDirs":["bishop"],"imgUrl":"https://s-media-cache-ak0.pinimg.com/originals/f0/34/df/f034df7627b5cb4dbef613bcb504482b.jpg"},{"type":"bishop","player":"P2","cost":2,"ready":true,"pos":"reserve","moveDirs":["bishop"],"imgUrl":"https://s-media-cache-ak0.pinimg.com/originals/f0/34/df/f034df7627b5cb4dbef613bcb504482b.jpg"},{"type":"rook","player":"P2","cost":3,"ready":true,"pos":"reserve","moveDirs":["rook"],"imgUrl":"http://wallup.net/wp-content/uploads/2016/04/10/297431-fantasy_armor-fantasy_art-sword-knight-angel_wings.png"},{"type":"rook","player":"P2","cost":3,"ready":true,"pos":"reserve","moveDirs":["rook"],"imgUrl":"http://wallup.net/wp-content/uploads/2016/04/10/297431-fantasy_armor-fantasy_art-sword-knight-angel_wings.png"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"},{"type":"node","player":"P2","cost":0,"ready":true,"pos":"reserve","moveDirs":["none"],"imgUrl":"https://www.demilked.com/magazine/wp-content/uploads/2016/06/fantasy-jewelry-glow-in-the-dark-manon-richard-thumb640.jpg"}]
);
