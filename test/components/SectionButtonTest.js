import React from 'react';
import SectionButton from '../../src/components/SectionButton';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<SectionButton />', () => {
  it('should render a button by default', () => {
    const wrapper = shallow(<SectionButton tag="UL" />);
    expect(wrapper.containsMatchingElement(<button>UL</button>)).to.be.true;
  });

  it('should have semantic input type', () => {
    const wrapper = shallow(<SectionButton tag="UL" />);
    expect(wrapper).to.have.attr('type', 'button');
  });

  it('should allow custom input type', () => {
    const wrapper = shallow(<SectionButton tag="UL" type="reset" />);
    expect(wrapper).to.have.attr('type', 'reset');
  });

  it('should pass props to default child', () => {
    const wrapper = shallow(<SectionButton tag="UL" title="List" />);
    expect(wrapper).to.have.attr('title', 'List');
  });

  it('should render children', () => {
    const wrapper = shallow(<SectionButton tag="UL">List</SectionButton>);
    expect(wrapper.containsMatchingElement(<button>List</button>)).to.be.true;
  });

  it('should toggle markup on click', () => {
    const editor = { toggleSection: spy() };
    const context = { editor };
    const wrapper = shallow(<SectionButton tag='UL' />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.toggleSection).to.be.calledWith('UL');
  });

  it('should set active class', () => {
    const wrapper = shallow(<SectionButton tag='UL' className="keep" />);
    expect(wrapper).to.have.attr('class', 'keep');

    const context = { activeSectionTags: ['ul'] };

    const wrapperActive = shallow(<SectionButton tag='UL' className="keep" />, { context });
    expect(wrapperActive).to.have.attr('class', 'keep active');

    const wrapperActive2 = shallow(<SectionButton tag='UL' />, { context });
    expect(wrapperActive2).to.have.attr('class', 'active');

    const wrapperCustomActive = shallow(<SectionButton tag='UL' className="keep" activeClassName="aktiv" />, { context });
    expect(wrapperCustomActive).to.have.attr('class', 'keep aktiv');

    const wrapperCustomActive2 = shallow(<SectionButton tag='UL' activeClassName="aktiv" />, { context });
    expect(wrapperCustomActive2).to.have.attr('class', 'aktiv');
  });
});
