import React from 'react';
import LinkForm from '../../src/components/LinkForm';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

describe('<LinkForm />', () => {
  const context = {
    linkOffsets: {foo: "bar"},
    setLinkOffsets: spy(),
    addLink: spy()
  };

  it('should close the form', () => {
    const wrapper = mount(<LinkForm />, {context});
    const button = wrapper.ref('cancel');

    button.simulate('click');
    expect(context.setLinkOffsets).to.have.been.calledWith(null);
  });

  it('should add a link', () => {
    const wrapper = mount(<LinkForm />, {context});
    const form = wrapper.find('form');

    form.simulate('submit');
    expect(context.addLink).to.have.been.called;

    // should also close form after link added
    expect(context.setLinkOffsets).to.have.been.calledWith(null);
  });
});
