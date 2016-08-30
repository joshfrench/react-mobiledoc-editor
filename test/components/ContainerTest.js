import React, { Component } from 'react';
import Container from '../../src/components/Container';
import Editor from '../../src/components/Editor';
import { classToDOMCard } from '../../src/utils/classToCard';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';

describe('<Container />', () => {
  it('passes arbitrary props to child', () => {
    const wrapper = shallow(<Container className="foo" />);
    expect(wrapper).to.have.className('foo');
  });

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

  it('should pass mobiledoc to editor', () => {
    const doc = {
      version: "0.3.0",
      markups: [],
      atoms: [],
      cards: [],
      sections: [
        [1, "p", [
          [0, [], 0, "Ohai"]
        ]]
      ]
    };

    const wrapper = mount(<Container mobiledoc={doc} />);
    expect(wrapper.instance().editor.mobiledoc).to.equal(doc);
  });

  it('should pass html to editor', () => {
    const html = '<p>Ohai</p>';

    const wrapper = mount(<Container html={html} />);
    expect(wrapper.instance().editor.html).to.equal(html);
  });

  it('should pass placeholder to editor', () => {
    const wrapper = mount(<Container placeholder="placeholder!" />);
    expect(wrapper.instance().editor.placeholder).to.equal('placeholder!');
  });

  it('should pass spellcheck to editor', () => {
    let wrapper = mount(<Container />);
    expect(wrapper.instance().editor.spellcheck).to.be.true;

    wrapper = mount(<Container spellcheck={false} />);
    expect(wrapper.instance().editor.spellcheck).to.be.false;
  });

  it('should pass autofocus to editor', () => {
    let wrapper = mount(<Container />);
    expect(wrapper.instance().editor.autofocus).to.be.true;

    wrapper = mount(<Container autofocus={false} />);
    expect(wrapper.instance().editor.autofocus).to.be.false;
  });

  it('should pass placeholder to editor', () => {
    const wrapper = mount(<Container placeholder="Say something" />);
    expect(wrapper.instance().editor.placeholder).to.eq("Say something");
  });

  it('should pass serializeVersion to editor', () => {
    const onChange = spy();
    let wrapper = mount(<Container onChange={onChange}><Editor /></Container>);
    let editor = wrapper.instance().editor;

    editor.run(postEditor => {
      const section = postEditor.builder.createMarkupSection('p');
      postEditor.insertSection(section);
    });
    expect(onChange).to.have.been.calledWithMatch({ version: "0.3.0" });

    wrapper = mount(<Container serializeVersion="0.2.0" onChange={onChange}><Editor /></Container>);
    editor = wrapper.instance().editor;

    editor.run(postEditor => {
      const section = postEditor.builder.createMarkupSection('p');
      postEditor.insertSection(section);
    });
    expect(onChange).to.have.been.calledWithMatch({ "version": "0.2.0" });
  });

  it('should pass onChange to editor', () => {
    const onChange = spy();
    const wrapper = mount(<Container onChange={onChange}><Editor /></Container>);
    wrapper.instance().editor.run(postEditor => {
      const section = postEditor.builder.createMarkupSection('p');
      postEditor.insertSection(section);
    });
    expect(onChange).to.have.been.called;
  });

  it('should pass cards to editor', () => {
    const Card = { name: 'aCard', type: 'dom', render: () => null };
    const wrapper = mount(<Container cards={[Card]} />);
    expect(wrapper.instance().editor.cards).to.contain(Card);
  });

  it('should pass other options to editor', () => {
    let wrapper = mount(<Container />);
    expect(wrapper.instance().editor.undoDepth).to.equal(5);

    wrapper = mount(<Container options={{ undoDepth: 0 }} />);
    expect(wrapper.instance().editor.undoDepth).to.equal(0);
  });

  it('should forward cardProps to card components', () => {
    class Prop extends Component {
      componentDidMount() {
        this.props.didMount();
      }
      render() {
        return <span>Ohai</span>;
      }
    }
    const PropCard = classToDOMCard(Prop, 'PropCard');

    const doc = {
      version: '0.3.0',
      atoms: [],
      cards: [['PropCard', {}]],
      markups: [],
      sections: [[10, 0]]
    };

    const callback = spy();
    mount(<Container cardProps={{ didMount: callback }} mobiledoc={doc} cards={[PropCard]}>
            <Editor />
          </Container>);

    expect(callback).to.have.been.called;
  });

  it('should unmount editor', () => {
    const wrapper = shallow(<Container />);
    const editor = wrapper.instance().editor;
    spy(editor, 'destroy');
    wrapper.unmount();
    expect(editor.destroy).to.have.been.called;
  });
});
