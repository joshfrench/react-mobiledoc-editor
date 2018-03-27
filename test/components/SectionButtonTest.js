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
    const context = { activeSectionTags: ['ul']};
    const wrapper = shallow(<SectionButton tag='UL' className="keep" />, { context });
    expect(wrapper).to.have.className('keep');
    expect(wrapper).to.have.className('active');
  });
});
