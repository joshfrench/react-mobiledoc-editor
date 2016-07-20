import React from 'react';
import AtomControl  from '../../src/components/AtomControl';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<AtomControl />', () => {
  const HrAtom = {
    name: "hr",
    type: "dom",
    render() {
      return document.createElement('br');
    }
  };
  const button = <button>Hr</button>;

  it('should render a button by default', () => {
    const wrapper = shallow(<AtomControl atom="hr" />);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should pass props to default child', () => {
    const wrapper = shallow(<AtomControl atom="hr" disabled />);
    expect(wrapper).to.be.disabled();
  });

  it('should render children', () => {
    const wrapper = shallow(<AtomControl atom="hr">{button}</AtomControl>);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should insert atom on click', () => {
    const editor = { insertAtom: spy() };
    const context = { editor };
    const wrapper = shallow(<AtomControl atom="hr"><button /></AtomControl>, { context });
    wrapper.find('button').simulate('click');
    expect(editor.insertAtom).calledWith('hr');
  });

  it('should insert atom with options on click', () => {
    const editor = { insertAtom: spy() };
    const context = { editor };
    const payload = { foo: true };
    const value = "OHAI";

    const wrapper = shallow(<AtomControl atom="hr" payload={payload} value={value}><button /></AtomControl>, { context });
    wrapper.find('button').simulate('click');
    expect(editor.insertAtom).calledWith('hr', value, payload);
  });
});
