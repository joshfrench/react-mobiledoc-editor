import React from 'react';
import SectionSelect from '../../src/components/SectionSelect';
import { shallow } from 'enzyme';

describe(SectionSelect, () => {
  it('should render children', () => {
    const wrapper = shallow(<SectionSelect tags={['p']} className="headers" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should add section when new tag is selected', () => {
    const editor = { toggleSection: jest.fn() };
    const context = { editor };
    const wrapper = shallow(<SectionSelect tags={['p']} />, { context });
    wrapper.find('select').simulate('change', { target: { value: 'p' }});
    expect(editor.toggleSection).toBeCalledWith('p');
  });

  it('should remove active section when nothing is selected', () => {
    const editor = { toggleSection: jest.fn() };
    const context = { editor, activeSectionTags: ['p']};
    const wrapper = shallow(<SectionSelect tags={['p']} />, { context });
    wrapper.find('select').simulate('change', { target: { value: "" }});
    expect(editor.toggleSection).toBeCalledWith('p');
  });
});
