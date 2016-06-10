import React from 'react';
import LinkControl from '../src/components/LinkControl';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { shallow } from 'enzyme';

describe('<LinkControl />', () => {
  const button = <button>Link</button>;
  const editor = {
    hasCursor: stub().returns(true),
    hasActiveMarkup: stub()
  };

  it('should render a button by default', () => {
    const wrapper = shallow(<LinkControl />);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should render children', () => {
    const wrapper = shallow(<LinkControl>{button}</LinkControl>);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should add a link', () => {
    editor.hasActiveMarkup.returns(true);
    editor.toggleMarkup = spy();

    const wrapper = shallow(<LinkControl editor={editor} />);
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).to.be.calledWith('a');
  });

  it('should toggle link if a link is already active', () => {
    editor.hasActiveMarkup.returns(false);
    editor.range = "Range";
    const context = {
      setLinkOffsets: spy()
    };

    const wrapper = shallow(<LinkControl editor={editor} />, {context});
    wrapper.find('button').simulate('click');
    expect(context.setLinkOffsets).to.have.been.calledWith("Range");
  });

  it('should set active class');
});
