import React from 'react';
import SectionControl from '../../src/components/SectionControl';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<SectionControl />', () => {
  const button = <button>UL</button>;

  it('should render a button by default', () => {
    const wrapper = shallow(<SectionControl tag="UL" />);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should pass props to default child', () => {
    const wrapper = shallow(<SectionControl tag="UL" disabled />);
    expect(wrapper).to.be.disabled();
  });

  it('should render children', () => {
    const wrapper = shallow(<SectionControl tag="UL">{button}</SectionControl>);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should toggle markup on click', () => {
    const editor = { toggleSection: spy() };
    const context = {editor};
    const wrapper = shallow(<SectionControl tag='UL'><button /></SectionControl>, {context});
    wrapper.find('button').simulate('click');
    expect(editor.toggleSection).to.be.calledWith('UL');
  });

  it('should set active class', () => {
    const context = {activeSectionTags: ['ul']};
    const wrapper = shallow(<SectionControl tag='UL'><button className="keep" /></SectionControl>, {context});
    expect(wrapper).to.have.className('keep');
    expect(wrapper).to.have.className('active');
  });
});
