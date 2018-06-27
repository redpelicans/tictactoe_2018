import React from 'react';
import { shallow, mount } from 'enzyme';
import Component from '../component';

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

const onStart = jest.fn();
const computerPlay = jest.fn();

describe('App', () => {
  it('should render', () => {
    const wrapper = shallow(<Component {...state} onStart={onStart} computerPlay={computerPlay} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should start game', () => {
    const wrapper = mount(<Component {...state} onStart={onStart} computerPlay={computerPlay} />);
    const button = wrapper.find('button.start-game-button');
    button.simulate('click');
    expect(onStart).toHaveBeenCalled();
  });
});
