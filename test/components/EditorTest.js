import React from 'react';
import Editor from '../../src/components/Editor';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

describe('<Editor />', () => {
  it('mounts Mobiledoc.Editor', () => {
    const editor = { render: spy() };
    mount(<Editor editor={editor} />);

    expect(editor.render).to.have.been.called;
  });
});
