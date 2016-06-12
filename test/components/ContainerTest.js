import React from 'react';
import Container from '../../src/components/Container';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

describe('<Container />', () => {
  it('fires willCreateEditor callback', () => {
    const willCreateEditor = spy();
    mount(<Container willCreateEditor={willCreateEditor} />);

    expect(willCreateEditor).to.have.been.called;
  });

  it('fires didCreateEditor with editor instance', () => {
    const didCreateEditor = spy();
    const wrapper = mount(<Container didCreateEditor={didCreateEditor} />);

    expect(didCreateEditor).to.have.been.calledWith(wrapper.instance().editor);
  });

  it('should pass mobiledoc to editor');
  it('should pass placeholder to editor');
  it('should pass spellcheck to editor');
  it('should pass autofocus to editor');
  it('should pass options to editor');
  it('should serialize mobiledoc to mobiledocVersion');
  it('should pass onChange to editor');
});
