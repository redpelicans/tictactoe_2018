import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import App from './components/App';
import { X, O, GAME_OVER } from './game';

const { pathname } = document.location;
const name = pathname.slice(1) || 'Unknown player';
const player = { name, piece: O };
const computer = { name: 'computer', isComputer: true, piece: X };
const board = [X, O, X, null, null, X, O, null, null];
const history = [{ id: 1, winner: player }, { id: 2, winner: computer }, { id: 3, winner: player }, { id: 4 }];

const state = {
  currentPlayer: player,
  status: GAME_OVER,
  player,
  computer,
  board,
  history,
};

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('root');
render(<App {...state} />, mountNode);
