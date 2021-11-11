import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { MarkupButton, ReactMobileDocContext } from 'react-mobiledoc-editor';
import { spy } from 'sinon';

describe('<MarkupButton />', () => {
  it('should render a button by default', () => {
    const wrapper = mount(<MarkupButton tag="A" />);
    expect(wrapper.containsMatchingElement(<button>A</button>)).to.be.true;
  });

  it('should be semantic about input type', () => {
    const wrapper = mount(<MarkupButton tag="A" />);
    expect(wrapper).to.have.attr('type', 'button');
  });

  it('should allow custom input types', () => {
    const wrapper = mount(<MarkupButton tag="A" type="reset" />);
    expect(wrapper).to.have.attr('type', 'reset');
  });

  it('should pass props to default child', () => {
    const wrapper = mount(<MarkupButton tag="A" title="Link" />);
    expect(wrapper).to.have.attr('title', 'Link');
  });

  it('should render children', () => {
    const wrapper = mount(<MarkupButton tag="A">Link</MarkupButton>);
    expect(wrapper.containsMatchingElement(<button>Link</button>)).to.be.true;
  });

  it('should toggle markup on click', () => {
    const editor = { toggleMarkup: spy() };
    const context = { editor };
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <MarkupButton tag="A" />
      </ReactMobileDocContext.Provider>
    );
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).calledWith('A');
  });

  it('should set active class', () => {
    const wrapper = mount(<MarkupButton tag="A" className="keep" />);
    expect(wrapper).to.have.attr('class', 'keep');

    const context = { activeMarkupTags: ['a'] };

    const wrapperActive = mount(
      <ReactMobileDocContext.Provider value={context}>
        <MarkupButton tag="A" className="keep" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperActive).to.have.attr('class', 'keep active');

    const wrapperActive2 = mount(
      <ReactMobileDocContext.Provider value={context}>
        <MarkupButton tag="A" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperActive2).to.have.attr('class', 'active');

    const wrapperCustomActive = mount(
      <ReactMobileDocContext.Provider value={context}>
        <MarkupButton tag="A" className="keep" activeClassName="aktiv" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperCustomActive).to.have.attr('class', 'keep aktiv');

    const wrapperCustomActive2 = mount(
      <ReactMobileDocContext.Provider value={context}>
        <MarkupButton tag="A" activeClassName="aktiv" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperCustomActive2).to.have.attr('class', 'aktiv');
  });
});
