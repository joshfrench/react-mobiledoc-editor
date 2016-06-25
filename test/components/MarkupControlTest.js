import React from 'react';
import MarkupControl from '../../src/components/MarkupControl';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<MarkupControl />', () => {
  const button = <button>A</button>;

  it('should render a button by default', () => {
    const wrapper = shallow(<MarkupControl tag="A" />);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should pass props to default child', () => {
    const wrapper = shallow(<MarkupControl tag="A" disabled />);
    expect(wrapper).to.be.disabled();
  });

  it('should render children', () => {
    const wrapper = shallow(<MarkupControl tag="A">{button}</MarkupControl>);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should toggle markup on click', () => {
    const editor = { toggleMarkup: spy() };
    const context = { editor };
    const wrapper = shallow(<MarkupControl tag='A'><button /></MarkupControl>, { context });
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).calledWith('A');
  });

  it('should set active class', () => {
    const context = { activeMarkupTags: ['a']};
    const wrapper = shallow(<MarkupControl tag='A'><button className="keep" /></MarkupControl>, { context });
    expect(wrapper).to.have.className('keep');
    expect(wrapper).to.have.className('active');
  });
});
