import React from 'react';
import AttributeButton from '../../src/components/AttributeButton';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<AttributeButton />', () => {
  it('should render a button by default', () => {
    const wrapper = shallow(<AttributeButton attribute="text-align" value="left" />);
    expect(wrapper.containsMatchingElement(<button>Left</button>)).to.be.true;
  });

  it('should have semantic input type', () => {
    const wrapper = shallow(<AttributeButton attribute="text-align" value="left" />);
    expect(wrapper).to.have.attr('type', 'button');
  });

  it('should allow custom input type', () => {
    const wrapper = shallow(<AttributeButton attribute="text-align" value="left" type="reset" />);
    expect(wrapper).to.have.attr('type', 'reset');
  });

  it('should pass props to default child', () => {
    const wrapper = shallow(<AttributeButton attribute="text-align" value="left" title="Alignment" />);
    expect(wrapper).to.have.attr('title', 'Alignment');
  });

  it('should render children', () => {
    const wrapper = shallow(<AttributeButton attribute="text-align" value="left">Alignment</AttributeButton>);
    expect(wrapper.containsMatchingElement(<button>Alignment</button>)).to.be.true;
  });

  it('should set attribute on click', () => {
    const editor = { setAttribute: spy() };
    const context = { editor };
    const wrapper = shallow(<AttributeButton attribute="text-align" value="left" />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.setAttribute).to.be.calledWith('text-align', 'left');
  });

  it('should set active class', () => {
    const wrapper = shallow(<AttributeButton attribute="text-align" value="left" className="keep" />);
    expect(wrapper).to.have.attr('class', 'keep');

    const context = { activeSectionAttributes: [{ 'data-md-text-align': 'left' }]};

    const wrapperActive = shallow(<AttributeButton attribute="text-align" value="left" className="keep" />, { context });
    expect(wrapperActive).to.have.attr('class', 'keep active');

    const wrapperActive2 = shallow(<AttributeButton attribute="text-align" value="left" />, { context });
    expect(wrapperActive2).to.have.attr('class', 'active');

    const wrapperCustomActive = shallow(<AttributeButton attribute="text-align" value="left" className="keep" activeClassName="aktiv" />, { context });
    expect(wrapperCustomActive).to.have.attr('class', 'keep aktiv');

    const wrapperCustomActive2 = shallow(<AttributeButton attribute="text-align" value="left" activeClassName="aktiv" />, { context });
    expect(wrapperCustomActive2).to.have.attr('class', 'aktiv');
  });
});
