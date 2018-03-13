import React from 'react';
import MarkupButton from '../../src/components/MarkupButton';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<MarkupButton />', () => {
  it('should render a button by default', () => {
    const wrapper = shallow(<MarkupButton tag="A" />);
    expect(wrapper.containsMatchingElement(<button>A</button>)).to.be.true;
  });

  it('should be semantic about input type', () => {
    const wrapper = shallow(<MarkupButton tag="A" />);
    expect(wrapper).to.have.attr('type', 'button');
  });

  it('should allow custom input types', () => {
    const wrapper = shallow(<MarkupButton tag='A' type="reset" />);
    expect(wrapper).to.have.attr('type', 'reset');
  });

  it('should pass props to default child', () => {
    const wrapper = shallow(<MarkupButton tag="A" title="Link" />);
    expect(wrapper).to.have.attr('title', 'Link');
  });

  it('should render children', () => {
    const wrapper = shallow(<MarkupButton tag="A">Link</MarkupButton>);
    expect(wrapper.containsMatchingElement(<button>Link</button>)).to.be.true;
  });

  it('should toggle markup on click', () => {
    const editor = { toggleMarkup: spy() };
    const context = { editor };
    const wrapper = shallow(<MarkupButton tag='A' />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.toggleMarkup).calledWith('A');
  });

  it('should set active class', () => {
    const context = { activeMarkupTags: ['a']};
    const wrapper = shallow(<MarkupButton tag='A' className="keep" />, { context });
    expect(wrapper).to.have.className('keep');
    expect(wrapper).to.have.className('active');
  });
});
