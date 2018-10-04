import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import reducer from './reducers';
import { loadTitleFruit } from './actions/fruits';

import { X, O, GAME_OVER, getEmptyBoard } from './game';

const name = (window.location.hash && window.location.hash.slice(1)) || 'Unknown player';
const player = { name, piece: X };
const computer = { name: 'computer', isComputer: true, piece: O };

const initialState = {
  config: { apiServer: { host: 'rp5.redpelicans.com', port: 8888 } },
  titleIcon: { icon: 'question' },
  status: GAME_OVER,
  player,
  computer,
  board: getEmptyBoard(),
  history: [],
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk, createLogger)));
const mountNode = window.document.getElementById('root');
const ROOT = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

store.dispatch(loadTitleFruit());
render(ROOT, mountNode);
console.log('app mounted.'); // eslint-disable-line no-console
