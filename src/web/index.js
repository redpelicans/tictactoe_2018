import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';

const X = 'x';
const O = 'o';
const state = {
  board: [X, O, X, null, null, X, O, null, null],
};

console.log('mounting React ...'); // eslint-disable-line no-console
const mountNode = window.document.getElementById('root');
render(<App {...state} />, mountNode);
