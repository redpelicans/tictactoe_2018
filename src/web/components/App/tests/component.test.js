import React from 'react';
import { shallow } from 'enzyme';
import Component from '..';

const player = { name: 'NAME' };
const computer = { name: 'computer', isComputer: true };
const board = ['x', 'o', 'x', null, null, 'x', 'o', null, null];
const history = [{ id: 1, winner: player }];

const state = {
  currentPlayer: player,
  status: 'GAME_OVER',
  player,
  computer,
  board,
  history,
};

describe('App', () => {
  it('should render', () => {
    const wrapper = shallow(<Component {...state} />);
    expect(wrapper).toMatchSnapshot();
  });
});
