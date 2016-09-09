import React from 'react';
import LinkButton from '../../src/components/LinkButton';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { shallow } from 'enzyme';

describe('<LinkButton />', () => {
  const editor = {
    hasCursor: stub().returns(true),
    hasActiveMarkup: stub()
  };

  it('should render a button by default', () => {
    const wrapper = shallow(<LinkButton />);
    expect(wrapper.containsMatchingElement(<button>Link</button>)).to.be.true;
  });

  it('should pass props to default child', () => {
    const wrapper = shallow(<LinkButton title="link" />);
    expect(wrapper).to.have.attr('title', 'link');
  });

  it('should render children', () => {
    const wrapper = shallow(<LinkButton>A</LinkButton>);
    expect(wrapper.containsMatchingElement(<button>A</button>)).to.be.true;
  });

  it('should add a link', () => {
    editor.hasActiveMarkup.returns(true);
    editor.toggleMarkup = spy();
    const context = { editor };

    const wrapper = shallow(<LinkButton />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).to.be.calledWith('a');
  });

  it('should toggle link if a link is already active', () => {
    editor.hasActiveMarkup.returns(false);
    editor.range = "Range";
    const context = {
      setLinkOffsets: spy(),
      editor
    };

    const wrapper = shallow(<LinkButton />, { context });
    wrapper.find('button').simulate('click');
    expect(context.setLinkOffsets).to.have.been.calledWith("Range");
  });

  it('should set active class', () => {
    const context = { activeMarkupTags: ['a']};
    const wrapper = shallow(<LinkButton className="keep" />, { context });
    expect(wrapper).to.have.className('keep');
    expect(wrapper).to.have.className('active');
  });
});
