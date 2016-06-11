import React from 'react';
import Editor from '../../src/components/Editor';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

describe('<Editor />', () => {
  const editor = { render: spy() };

  it('mounts Mobiledoc.Editor', () => {
    mount(<Editor editor={editor} />);

    expect(editor.render).to.have.been.called;
  });

  it('fires willCreateEditor callback', () => {
    const willCreateEditor = spy();
    mount(<Editor willCreateEditor={willCreateEditor} />);

    expect(willCreateEditor).to.have.been.called;
  });

  it('fires didCreateEditor with editor instance', () => {
    const didCreateEditor = spy();
    mount(<Editor editor={editor} didCreateEditor={didCreateEditor} />);

    expect(didCreateEditor).to.have.been.calledWith(editor);
  });
});
