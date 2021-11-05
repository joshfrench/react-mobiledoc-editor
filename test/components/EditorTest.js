import React from 'react';
import Editor from '../../src/components/Editor';
import { ReactMobileDocContext } from "../../src/components/Context";
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

describe('<Editor />', () => {
  it('mounts Mobiledoc.Editor', () => {
    const context = { editor: { render: spy() }};
    mount(
      <ReactMobileDocContext.Provider value={context}>
        <Editor />
      </ReactMobileDocContext.Provider>
    );

    expect(context.editor.render).to.have.been.called;
  });

  it('passes arbitrary props to node', () => {
    const context = { editor: { render: spy() }};
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <Editor className="foo" />
      </ReactMobileDocContext.Provider>
    );
    expect(wrapper.find('div')).to.have.className('foo');
  });
});
