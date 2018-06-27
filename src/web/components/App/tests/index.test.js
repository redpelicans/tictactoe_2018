import React from 'react';
import { shallow } from 'enzyme';
import { enhance } from '../index';

describe('app | containers | App', () => {
  it('should render', () => {
    const Component = () => <div />;
    const EnhancedComponent = enhance(Component);

    const wrapper = shallow(<EnhancedComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
