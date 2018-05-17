import React from 'react';
import { shallow } from 'enzyme';
import Component from '..';

const X = 'x';
const O = 'o';
const player = { name: 'TOTO' };
const state = {
  currentPlayer: player,
  status: 'GAME_OVER',
  player,
  board: [X, O, X, null, null, X, O, null, null],
  history: [],
};

describe('App', () => {
  it('should render', () => {
    const wrapper = shallow(<Component {...state} />);
    expect(wrapper).toMatchSnapshot();
  });
});
