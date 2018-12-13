import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '../../src/components/Toolbar';

describe(Toolbar, () => {
  it('passes props to first child', () => {
    const wrapper = shallow(<Toolbar className="foo" />);
    expect(wrapper).toMatchSnapshot();
  });
});
