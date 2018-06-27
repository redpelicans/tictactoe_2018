import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import App from './components/App';
import { getNewBoard, GAME_OVER, O, X } from './game';

const { pathname } = document.location;
const name = pathname.slice(1) || 'Unknown player';
const player = { name, piece: O };
const computer = { name: 'computer', isComputer: true, piece: X };
const history = [];
const board = getNewBoard();

const state = {
  status: GAME_OVER,
  player,
  computer,
  history,
  board,
};

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('root');
render(<App {...state} />, mountNode);
