import React from 'react';
import LinkButton from '../../src/components/LinkButton';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { shallow } from 'enzyme';
import Mobiledoc from 'mobiledoc-kit';

describe('<LinkButton />', () => {
  const editor = {
    hasCursor: stub().returns(true),
    hasActiveMarkup: stub(),
    range: {
      isCollapsed: stub().returns(false)
    }
  };

  it('should render a button by default', () => {
    const wrapper = shallow(<LinkButton />);
    expect(wrapper.containsMatchingElement(<button>Link</button>)).to.be.true;
  });

  it('should have semantic input type', () => {
    const wrapper = shallow(<LinkButton />);
    expect(wrapper).to.have.attr('type', 'button');
  });

  it('should allow custom input type', () => {
    const wrapper = shallow(<LinkButton type="reset" />);
    expect(wrapper).to.have.attr('type', 'reset');
  });

  it('should pass props to default child', () => {
    const wrapper = shallow(<LinkButton title="link" />);
    expect(wrapper).to.have.attr('title', 'link');
  });

  it('should render children', () => {
    const wrapper = shallow(<LinkButton>A</LinkButton>);
    expect(wrapper.containsMatchingElement(<button>A</button>)).to.be.true;
  });

  it('should remove existing link markup', () => {
    editor.hasActiveMarkup.returns(true);
    editor.toggleMarkup = spy();
    const context = { editor };

    const wrapper = shallow(<LinkButton />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).to.be.calledWith('a');
  });

  it('should delegate link creation to Mobiledoc.UI.toggleLink', () => {
    spy(Mobiledoc.default.UI, 'toggleLink');
    editor.hasActiveMarkup.returns(false);

    const context = { editor };
    const wrapper = shallow(<LinkButton />, { context });
    wrapper.find('button').simulate('click');

    expect(Mobiledoc.default.UI.toggleLink).to.have.been.calledWith(editor);
    Mobiledoc.default.UI.toggleLink.restore();
  });

  it('should set active class', () => {
    const context = { activeMarkupTags: ['a']};
    const wrapper = shallow(<LinkButton className="keep" />, { context });
    expect(wrapper).to.have.className('keep');
    expect(wrapper).to.have.className('active');

    const wrapperCustomActive = shallow(<LinkButton className="keep" activeClassName="aktiv" />, { context });
    expect(wrapperCustomActive).to.have.className('keep');
    expect(wrapperCustomActive).to.have.className('aktiv');
  });

  it('should accept a custom prompt function', () => {
    spy(Mobiledoc.default.UI, 'toggleLink');
    const myPrompt = spy();
    editor.hasActiveMarkup.returns(false);

    const context = { editor };
    const wrapper = shallow(<LinkButton handler={myPrompt} />, { context });
    wrapper.find('button').simulate('click');

    expect(Mobiledoc.default.UI.toggleLink).to.have.been.calledWith(editor, myPrompt);
    Mobiledoc.default.UI.toggleLink.restore();
  });
});
