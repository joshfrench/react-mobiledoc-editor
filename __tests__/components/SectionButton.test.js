import React from 'react';
import { shallow } from 'enzyme';
import SectionButton from '../../src/components/SectionButton';

describe('<SectionButton />', () => {
  it('should render', () => {
    const wrapper = shallow(<SectionButton tag="UL" type="reset" title="List" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render children', () => {
    const wrapper = shallow(<SectionButton tag="UL">List</SectionButton>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle markup on click', () => {
    const editor = { toggleSection: jest.fn() };
    const context = { editor };
    const wrapper = shallow(<SectionButton tag='UL' />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.toggleSection).toBeCalledWith('UL');
  });

  it('should set active class', () => {
    const context = { activeSectionTags: ['ul']};
    const wrapper = shallow(<SectionButton tag='UL' className="keep" />, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
