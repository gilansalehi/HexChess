import $ from 'jquery';

export const loginRequest = (credentials) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST_PENDING' });
    return login(credentials, dispatch);
  }
}

const login = (credentials, dispatch) => {
  $.ajax({
    url: '/session',
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: 'POST',
    dataType: 'json',
    data: credentials,
    success: function (currentUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: currentUser });
    },
    error: function (msg) {
      dispatch({ type: 'LOGIN_ERROR', payload: msg });
    }
  });
}

export const logoutRequest = (currentUser) => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_REQUEST_PENDING' });
    return logout(currentUser, dispatch);
  }
}

export const logout = (currentUser, dispatch) => {
  $.ajax({
    url: '/logout',
    type: 'GET',
    dataType: 'json',
    success: function (currentUser) {
      dispatch({ type: 'LOGOUT_SUCCESS', payload: currentUser });
    },
    error: function (msg) {
      dispatch({ type: 'LOGOUT_ERROR', payload: msg });
    }
  });
};

export const fetchCurrentUser = (callback) => {
  dispatch({ type: 'FETCH_CURRENT_USER_PENDING' });
  $.ajax({
    url: '/api/session',
    type: 'GET',
    dataType: 'json',
    success: function (currentUser) {
      dispatch({ type: 'FETCH_CURRENT_USER_SUCCESS', payload: currentUser });
      callback && callback();
    }
  });
}
