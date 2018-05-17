import React from 'react';
import { shallow } from 'enzyme';
import { BoardPanel, Board, Cell, Message } from '../';

const state = {
  board: ['x', 'x', 'x'],
  currentPlayer: { name: 'Toto' },
};

describe('<Board/>', () => {
  it('should render', () => {
    const wrapper = shallow(<BoardPanel {...state} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Cell/>', () => {
    const wrapper = shallow(<Board {...state} />).find(Cell);
    expect(wrapper)
      .find(Cell)
      .toHaveLength(3);
  });

  it('should render a <Message/>', () => {
    // const text = shallow(<Message {...state} />).find('span').text();
    const text = shallow(<Message {...state} />);
    expect(text).toMatch(new RegExp(state.currentPlayer.name));
  });

  // it('should render a <BoardPanel/>', () => {
  //   expect(shallow(<BoardPanel {...state} />).find(Message)).have.length(1);
  //   expect(shallow(<BoardPanel {...state} />).find(Board)).have.length(1);
  // });
  //
  // it('should render a <Cell/>', () => {
  //   const text = shallow(<Cell piece='X' />).childAt(0).text();
  //   expect(text).eql('X');
  // });
  //
  // it('should render an empty <Cell/>', () => {
  //   const text = shallow(<Cell />).childAt(0).text();
  //   expect(text).eql('\u00a0');
  // });
});
