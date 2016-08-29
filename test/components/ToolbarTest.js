import React from 'react';
import Toolbar from '../../src/components/Toolbar';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<Toolbar />', () => {
  it('passes props to first child', () => {
    const wrapper = shallow(<Toolbar className="foo" />);
    expect(wrapper).to.have.className('foo');
  });

  it('renders additional items', () => {
    const button = <button>Add Widget</button>;
    const wrapper = shallow(<Toolbar>{button}</Toolbar>);
    expect(wrapper).to.contain(button);
  });
});
