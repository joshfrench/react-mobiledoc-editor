import React from 'react';
import { ReactMobileDocContext } from "../../src/components/Context";
import LinkButton from '../../src/components/LinkButton';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { mount } from 'enzyme';
import { UI } from 'mobiledoc-kit';

describe('<LinkButton />', () => {
  const editor = {
    hasCursor: stub().returns(true),
    hasActiveMarkup: stub(),
    range: {
      isCollapsed: stub().returns(false)
    }
  };

  it('should render a button by default', () => {
    const wrapper = mount(<LinkButton />);
    expect(wrapper.containsMatchingElement(<button>Link</button>)).to.be.true;
  });

  it('should have semantic input type', () => {
    const wrapper = mount(<LinkButton />);
    expect(wrapper).to.have.attr('type', 'button');
  });

  it('should allow custom input type', () => {
    const wrapper = mount(<LinkButton type="reset" />);
    expect(wrapper).to.have.attr('type', 'reset');
  });

  it('should pass props to default child', () => {
    const wrapper = mount(<LinkButton title="link" />);
    expect(wrapper).to.have.attr('title', 'link');
  });

  it('should render children', () => {
    const wrapper = mount(<LinkButton>A</LinkButton>);
    expect(wrapper.containsMatchingElement(<button>A</button>)).to.be.true;
  });

  it('should remove existing link markup', () => {
    editor.hasActiveMarkup.returns(true);
    editor.toggleMarkup = spy();
    const context = { editor };

    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <LinkButton />
      </ReactMobileDocContext.Provider>
    );
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).to.be.calledWith('a');
  });

  it('should delegate link creation to Mobiledoc.UI.toggleLink', () => {
    spy(UI, 'toggleLink');
    editor.hasActiveMarkup.returns(false);

    const context = { editor };
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <LinkButton />
      </ReactMobileDocContext.Provider>
    );
    wrapper.find('button').simulate('click');

    expect(UI.toggleLink).to.have.been.calledWith(editor);
    UI.toggleLink.restore();
  });

  it('should set active class', () => {
    const wrapper = mount(<LinkButton className="keep" />);
    expect(wrapper).to.have.attr('class', 'keep');

    const context = { activeMarkupTags: ['a']};

    const wrapperActive = mount(
      <ReactMobileDocContext.Provider value={context}>
        <LinkButton className="keep" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperActive).to.have.attr('class', 'keep active');

    const wrapperActive2 = mount(
      <ReactMobileDocContext.Provider value={context}>
        <LinkButton />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperActive2).to.have.attr('class', 'active');

    const wrapperCustomActive = mount(
      <ReactMobileDocContext.Provider value={context}>
        <LinkButton className="keep" activeClassName="aktiv" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperCustomActive).to.have.attr('class', 'keep aktiv');

    const wrapperCustomActive2 = mount(
      <ReactMobileDocContext.Provider value={context}>
        <LinkButton activeClassName="aktiv" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperCustomActive2).to.have.attr('class', 'aktiv');
  });

  it('should accept a custom prompt function', () => {
    spy(UI, 'toggleLink');
    const myPrompt = spy();
    editor.hasActiveMarkup.returns(false);

    const context = { editor };
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <LinkButton handler={myPrompt} />
      </ReactMobileDocContext.Provider>
    );
    wrapper.find('button').simulate('click');

    expect(UI.toggleLink).to.have.been.calledWith(editor, myPrompt);
    UI.toggleLink.restore();
  });
});
