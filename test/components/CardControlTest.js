import React from 'react';
import CardControl from '../../src/components/CardControl';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

describe('<CardControl />', () => {
  const Card = { name: "TestCard" };
  const button = <button>Test</button>;
  const editor = { insertCard: spy() };
  const context = { editor };

  it('should render a button by default', () => {
    const wrapper = shallow(<CardControl card={Card} />);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should pass arbitrary props to default child', () => {
    const wrapper = shallow(<CardControl card={Card} className="foo" />);
    expect(wrapper).to.have.className('foo');
  });

  it('should render children', () => {
    const wrapper = shallow(<CardControl card={Card}>{button}</CardControl>);
    expect(wrapper.containsMatchingElement(button)).to.be.true;
  });

  it('should add card on click', () => {
    const wrapper = shallow(<CardControl card={Card} />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.insertCard).calledWith('TestCard', {}, true);
  });

  it('should add a card in edit mode', () => {
    const wrapper = shallow(<CardControl card={Card} edit={false} />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.insertCard).calledWith('TestCard', {}, false);
  });

  it('should add a card with payload', () => {
    const wrapper = shallow(<CardControl card={Card} payload={{ foo: "bar" }} />, { context });
    wrapper.find('button').simulate('click');
    expect(editor.insertCard).calledWith('TestCard', { foo: "bar" }, true);
  });
});
