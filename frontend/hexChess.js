import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, History, Location } from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import allReducers from './reducers';
import App from './containers/App';
import GamesIndex from './containers/gamesIndex';
import Game from './containers/game';

// import createHistory from 'history/createBrowserHistory'
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// import { fetchGameData } from './actions/startup';

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

window.init = function () {
  document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
  });
};
