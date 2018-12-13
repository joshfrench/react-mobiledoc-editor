import React from 'react';
import { shallow } from 'enzyme';
import MarkupButton from '../../src/components/MarkupButton';

describe('<MarkupButton />', () => {
  it('should render', () => {
    const wrapper = shallow(<MarkupButton tag="A" type="reset" title="Link" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render children', () => {
    const wrapper = shallow(<MarkupButton tag="A">Link</MarkupButton>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle markup on click', () => {
    const editor = { toggleMarkup: jest.fn() };
    const context = { editor };
    const wrapper = shallow(<MarkupButton tag='A' />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).toBeCalledWith('A');
  });

  it('should set active class', () => {
    const context = { activeMarkupTags: ['a']};
    const wrapper = shallow(<MarkupButton tag='A' className="keep" />, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
