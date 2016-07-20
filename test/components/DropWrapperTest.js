import React from 'react';
import DropWrapper from '../../src/components/DropWrapper';
import { expect } from 'chai';
import { stub, spy, match } from 'sinon';
import { mount } from 'enzyme';

describe('<DropWrapper />', () => {
  it('should call onDrop with event and editor', () => {
    const context = { editor: { positionAtPoint: stub().returns({ section: undefined }) }}; // bypass actual range selection
    const onDrop = spy();
    const event = { clientX: 1, clientY: 100 };
    const wrapper = mount(<DropWrapper onDrop={onDrop}><div /></DropWrapper>, { context });

    wrapper.find('div').simulate('drop', event);
    expect(onDrop).to.have.been.calledWith(match({ clientX: 1, clientY: 100 }), context.editor);
  });
});
