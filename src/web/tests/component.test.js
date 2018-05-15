import React from 'react';
import { shallow } from 'enzyme';
import Component from '../App';

describe('App', () => {
  it('should render', () => {
    const wrapper = shallow(<Component />);
    expect(wrapper).toMatchSnapshot();
  });
});
