import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Toolbar } from 'react-mobiledoc-editor';

describe('<Toolbar />', () => {
  it('passes props to first child', () => {
    const wrapper = shallow(<Toolbar className="foo" />);
    expect(wrapper).to.have.className('foo');
  });
});
