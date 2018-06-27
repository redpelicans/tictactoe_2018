import React from 'react';
import { shallow } from 'enzyme';
import { BoardPanel, Board, Cell, Message } from '../';

const state = {
  status: 'GAME_OVER',
  board: ['x', 'x', 'x'],
  currentPlayer: { name: 'Toto' },
  computerPlay: new Function(),
};

describe('<Board/>', () => {
  it('should render', () => {
    const wrapper = shallow(<BoardPanel {...state} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Cell/>', () => {
    const wrapper = shallow(<Board {...state} />).find(Cell);
    expect(wrapper).toHaveLength(3);
  });

  it('should render a <Message/>', () => {
    const wrapper = shallow(<Message {...state} />);
    expect(wrapper.find('span').text()).toMatch(new RegExp(state.currentPlayer.name));
  });

  it('should render a <BoardPanel/>', () => {
    expect(shallow(<BoardPanel {...state} />).find(Message)).toHaveLength(1);
    expect(shallow(<BoardPanel {...state} />).find(Board)).toHaveLength(1);
  });

  it('should render a <Cell/>', () => {
    const text = shallow(<Cell piece="X" />)
      .childAt(0)
      .text();
    expect(text).toEqual('X');
  });

  it('should render an empty <Cell/>', () => {
    const text = shallow(<Cell />)
      .childAt(0)
      .text();
    expect(text).toEqual('\u00a0');
  });
});
