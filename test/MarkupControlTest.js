import React from 'react';
import MarkupControl from '../src/components/MarkupControl';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<MarkupControl />', () => {
  it('should render children', () => {
    const button = <button>A</button>;
    const wrapper = shallow(<MarkupControl>{button}</MarkupControl>);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should toggle markup on click', () => {
    const editor = { toggleMarkup: spy() };
    const wrapper = shallow(<MarkupControl editor={editor} tag='A'><button /></MarkupControl>);
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).calledWith('A');
  });

  it('should set active class');
});
