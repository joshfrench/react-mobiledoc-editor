import React from 'react';
import Toolbar from '../../src/components/Toolbar';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<Toolbar />', () => {
  it('passes props to first child', () => {
    const wrapper = shallow(<Toolbar className="foo" />);
    expect(wrapper).to.have.className('foo');
  });
});
