import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { ReactMobileDocContext, SectionButton } from 'react-mobiledoc-editor';
import { spy } from 'sinon';

describe('<SectionButton />', () => {
  it('should render a button by default', () => {
    const wrapper = mount(<SectionButton tag="UL" />);
    expect(wrapper.containsMatchingElement(<button>UL</button>)).to.be.true;
  });

  it('should have semantic input type', () => {
    const wrapper = mount(<SectionButton tag="UL" />);
    expect(wrapper).to.have.attr('type', 'button');
  });

  it('should allow custom input type', () => {
    const wrapper = mount(<SectionButton tag="UL" type="reset" />);
    expect(wrapper).to.have.attr('type', 'reset');
  });

  it('should pass props to default child', () => {
    const wrapper = mount(<SectionButton tag="UL" title="List" />);
    expect(wrapper).to.have.attr('title', 'List');
  });

  it('should render children', () => {
    const wrapper = mount(<SectionButton tag="UL">List</SectionButton>);
    expect(wrapper.containsMatchingElement(<button>List</button>)).to.be.true;
  });

  it('should toggle markup on click', () => {
    const editor = { toggleSection: spy() };
    const context = { editor };
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <SectionButton tag="UL" />
      </ReactMobileDocContext.Provider>
    );
    wrapper.find('button').simulate('click');
    expect(editor.toggleSection).to.be.calledWith('UL');
  });

  it('should set active class', () => {
    const wrapper = mount(<SectionButton tag="UL" className="keep" />);
    expect(wrapper).to.have.attr('class', 'keep');

    const context = { activeSectionTags: ['ul'] };

    const wrapperActive = mount(
      <ReactMobileDocContext.Provider value={context}>
        <SectionButton tag="UL" className="keep" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperActive).to.have.attr('class', 'keep active');

    const wrapperActive2 = mount(
      <ReactMobileDocContext.Provider value={context}>
        <SectionButton tag="UL" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperActive2).to.have.attr('class', 'active');

    const wrapperCustomActive = mount(
      <ReactMobileDocContext.Provider value={context}>
        <SectionButton tag="UL" className="keep" activeClassName="aktiv" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperCustomActive).to.have.attr('class', 'keep aktiv');

    const wrapperCustomActive2 = mount(
      <ReactMobileDocContext.Provider value={context}>
        <SectionButton tag="UL" activeClassName="aktiv" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapperCustomActive2).to.have.attr('class', 'aktiv');
  });
});
