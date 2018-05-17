import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import { X, O, GAME_OVER } from './game';

const { pathname } = document.location;
const name = pathname.slice(1) || 'Unknown player';
const player = { name };

const state = {
  currentPlayer: player,
  status: GAME_OVER,
  player,
  board: [X, O, X, null, null, X, O, null, null],
};

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('root');
render(<App {...state} />, mountNode);
