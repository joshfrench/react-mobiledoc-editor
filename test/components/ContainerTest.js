import React from 'react';
import Container from '../../src/components/Container';
import {ADD_CARD_HOOK, REMOVE_CARD_HOOK, ADD_ATOM_HOOK, REMOVE_ATOM_HOOK} from '../../src/components/Container';
import Editor from '../../src/components/Editor';
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
    expect(onChange).to.have.been.calledWithMatch({"version": "0.2.0"});
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

    wrapper = mount(<Container options={{undoDepth: 0}} />);
    expect(wrapper.instance().editor.undoDepth).to.equal(0);
  });

  it('should unmount editor', () => {
    const wrapper = shallow(<Container />);
    const editor = wrapper.instance().editor;
    spy(editor, 'destroy');
    wrapper.unmount();
    expect(editor.destroy).to.have.been.called;
  });

  describe('card components', () => {
    const Child = ({payload}) => <button>{payload.text}</button>;
    const childCard = {
      component: Child,
      destinationElementId: 'root',
      env: {},
      payload: { text: 'Ohai' }
    };

    it('should mount a card component', () => {
      const wrapper = shallow(<Container />);
      wrapper.instance().mountComponentCard(childCard);
      const node = document.querySelector('#root button');
      expect(node.textContent).to.equal('Ohai');
    });

    it('should add a card component', () => {
      const wrapper = shallow(<Container />);
      const cardArg = {
        env: { name: 'ChildCard' },
        payload: { text: 'Ohai' }
      };
      const {card, destinationElement} = wrapper.instance()[ADD_CARD_HOOK](Child, cardArg);

      expect(card.component).to.eql(Child);
      expect(card.payload).to.eql(cardArg.payload);
      expect(destinationElement.id).to.eql(card.destinationElementId);
      expect(wrapper.state('componentCards')).to.include(card);
    });

    it('should remove a card component', () => {
      const wrapper = shallow(<Container />);
      wrapper.instance().mountComponentCard(childCard);
      wrapper.setState({ componentCards: [childCard] });

      wrapper.instance()[REMOVE_CARD_HOOK](childCard);
      expect(document.querySelector('#root button')).not.to.exist;
      expect(wrapper.state('componentCards')).to.eql([]);
    });
  });

  describe('component atoms', () => {
    const Child = ({value}) => <span>{value}</span>;
    const childAtom = {
      component: Child,
      destinationElementId: 'root',
      env: {},
      value: "Ohai"
    };

    it('should add an atom component', () => {
      const wrapper = shallow(<Container />);
      const atomArg = {
        env: { name: 'ChildAtom' },
        value: 'Ohai'
      };
      const {atom, destinationElement} = wrapper.instance()[ADD_ATOM_HOOK](Child, atomArg);

      expect(atom.component).to.eql(Child);
      expect(atom.value).to.eql(atomArg.value);
      expect(destinationElement.id).to.eql(atom.destinationElementId);
      expect(wrapper.state('componentAtoms')).to.include(atom);
    });

    it('should mount an atom component', () => {
      const wrapper = shallow(<Container />);
      wrapper.instance().mountComponentAtom(childAtom);
      const node = document.querySelector('#root span');
      expect(node.textContent).to.equal('Ohai');
    });

    it('should remove an atom component', () => {
      const wrapper = shallow(<Container />);
      wrapper.instance().mountComponentAtom(childAtom);
      wrapper.setState({ componentAtoms: [childAtom] });

      wrapper.instance()[REMOVE_ATOM_HOOK](childAtom);
      expect(document.querySelector('#root span')).not.to.exist;
      expect(wrapper.state('componentAtoms')).to.eql([]);
    });
  });
});
