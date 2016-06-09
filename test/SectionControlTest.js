import React from 'react';
import SectionControl from '../src/components/SectionControl';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<SectionControl />', () => {
  it('should render children', () => {
    const button = <button>A</button>;
    const wrapper = shallow(<SectionControl>{button}</SectionControl>);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should toggle markup on click', () => {
    const editor = { toggleSection: spy() };
    const wrapper = shallow(<SectionControl editor={editor} tag='UL'><button /></SectionControl>);
    wrapper.find('button').simulate('click');
    expect(editor.toggleSection).calledWith('UL');
  });

  it('should set active class');
});
