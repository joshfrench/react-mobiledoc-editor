import React from 'react';
import Editor from '../../src/components/Editor';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';

describe('<Editor />', () => {
  it('mounts Mobiledoc.Editor', () => {
    const context = { editor: { render: spy() }};
    mount(<Editor />, { context });

    expect(context.editor.render).to.have.been.called;
  });

  it('passes arbitrary props to node', () => {
    const wrapper = shallow(<Editor className="foo" />);
    expect(wrapper).to.have.className('foo');
  });
});
