import React from 'react';
import AttributeSelect from '../../src/components/AttributeSelect';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

// TODO
// Option label (LEFT -> Left)
// Test default value
// handle empty activeSectionAttributes array better?
// clean up default value logic?
describe('<AttributeSelect />', () => {
  it('should render children', () => {
    const activeSectionAttributes = [{}];
    const context = { activeSectionAttributes };
    const wrapper = shallow(<AttributeSelect attribute='text-align' values={['left', 'right']} />, { context });
    const option = <option value="left" key="left">LEFT</option>;
    expect(wrapper.containsMatchingElement(option)).to.be.true;
    expect(wrapper).to.have.prop('value', 'left');
  });

  it('should pass props to <select>', () => {
    const wrapper = shallow(<AttributeSelect values={['left', 'right', 'center']} className="alignment" />);
    expect(wrapper).to.have.className('alignment');
  });
});
