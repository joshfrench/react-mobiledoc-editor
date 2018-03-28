import React from 'react';
import SectionSelect from '../../src/components/SectionSelect';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<SectionSelect />', () => {
  it('should render children', () => {
    const wrapper = shallow(<SectionSelect tags={['p']} />);
    const option = <option value="p" key="p">P</option>;
    expect(wrapper.containsMatchingElement(option)).to.be.true;
  });

  it('should pass props to <select>', () => {
    const wrapper = shallow(<SectionSelect tags={['p']} className="headers" />);
    expect(wrapper).to.have.className('headers');
  });

  it('should add section when new tag is selected', () => {
    const editor = { toggleSection: spy() };
    const context = { editor };
    const wrapper = shallow(<SectionSelect tags={['p']} />, { context });
    wrapper.find('select').simulate('change', { target: { value: 'p' }});
    expect(editor.toggleSection).to.be.calledWith('p');
  });

  it('should remove active section when nothing is selected', () => {
    const editor = { toggleSection: spy() };
    const context = { editor, activeSectionTags: ['p']};
    const wrapper = shallow(<SectionSelect tags={['p']} />, { context });
    wrapper.find('select').simulate('change', { target: { value: "" }});
    expect(editor.toggleSection).to.be.calledWith('p');
  });
});
