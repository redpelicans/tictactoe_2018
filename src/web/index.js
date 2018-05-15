import React from 'react';
import { render } from 'react-dom';
import App from './App';

console.log('mounting React ...'); // eslint-disable-line no-console

const mountNode = window.document.getElementById('root');
render(<App />, mountNode);
