import React from 'react';
import ReactDOM from 'react-dom';
import Mobiledoc from 'mobiledoc-kit';
import {generate as shortid} from 'shortid';

export const ADD_CARD_HOOK = 'addCardComponent';
export const REMOVE_CARD_HOOK = 'removeCardComponent';

const EMPTY_MOBILEDOC = {
  version: "0.3.0",
  markups: [],
  atoms: [],
  cards: [],
  sections: []
};

const Container = React.createClass({
  propTypes: {
    autofocus: React.PropTypes.bool,
    cards: React.PropTypes.array,
    didCreateEditor: React.PropTypes.func,
    mobiledoc: React.PropTypes.object,
    onChange: React.PropTypes.func,
    options: React.PropTypes.object,
    serializeVersion: React.PropTypes.string,
    spellcheck: React.PropTypes.bool,
    willCreateEditor: React.PropTypes.func
  },
  childContextTypes: {
    editor: React.PropTypes.object,
    linkOffsets: React.PropTypes.object,
    setLinkOffsets: React.PropTypes.func,
    addLink: React.PropTypes.func,
    activeMarkupTags: React.PropTypes.array,
    activeSectionTags: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      autofocus: true,
      cards: [],
      serializeVersion: "0.3.0",
      spellcheck: true
    };
  },
  getInitialState() {
    return {
      activeMarkupTags: [],
      activeSectionTags: [],
      componentCards: []
    };
  },
  getChildContext() {
    return {
      editor: this.editor,
      linkOffsets: this.state.linkOffsets,
      setLinkOffsets: (range) => this.setState({ linkOffsets: range }),
      addLink: this.addLink,
      activeMarkupTags: this.state.activeMarkupTags,
      activeSectionTags: this.state.activeSectionTags
    };
  },
  componentWillMount() {
    if (typeof this.props.willCreateEditor === 'function') {
      this.props.willCreateEditor();
    }

    const mobiledoc = this.props.mobiledoc || EMPTY_MOBILEDOC;
    const { autofocus, cards, placeholder, serializeVersion, spellcheck } = this.props;
    const editorOptions = { ...this.props.options, mobiledoc, autofocus, cards, placeholder, serializeVersion, spellcheck };
    editorOptions.cardOptions = {
      [ADD_CARD_HOOK]: this[ADD_CARD_HOOK],
      [REMOVE_CARD_HOOK]: this[REMOVE_CARD_HOOK]
    };
    this.editor = new Mobiledoc.Editor(editorOptions);

    this.editor.inputModeDidChange(this.setActiveTags);

    if (typeof this.props.onChange === 'function') {
      this.editor.postDidChange(() => {
        const mobiledoc = this.editor.serialize(this.props.serializeVersion);
        this.props.onChange(mobiledoc);
      });
    }

    if (typeof this.props.didCreateEditor === 'function') {
      this.props.didCreateEditor(this.editor);
    }
  },
  componentDidUpdate() {
    this.state.componentCards.forEach(this.mountComponentCard);
  },
  componentWillUnmount() {
    this.editor.destroy();
  },
  render() {
    const { children, ...props } = this.props;
    return <div {...props}>{children}</div>;
  },
  [ADD_CARD_HOOK](component, {env, options, payload}, isEditing=false) {
    const cardId = shortid();
    const cardName = env.name;
    const destinationElementId = `mobiledoc-editor-card-${cardId}`;
    const destinationElement = document.createElement('div');
    destinationElement.id = destinationElementId;

    // deref payload
    payload = { ...payload };

    const card = {
      component,
      destinationElementId,
      cardName,
      payload,
      env,
      editor: this.editor,
      postModel: env.postModel,
      isEditing
    };

    // gross, slow, and i'll almost definitely regret this later. but we
    // need to delay setting state until after the current loop finishes
    // or addCard will fire before removeCard has flushed, thereby
    // clobbering the removal. Maybe a +1 for Redux?
    window.requestAnimationFrame(() =>
      { this.setState({componentCards: [ ...this.state.componentCards, card ]}); }
    );

    return {card, destinationElement};
  },
  [REMOVE_CARD_HOOK](card) {
    ReactDOM.unmountComponentAtNode(document.getElementById(card.destinationElementId));
    const cards = this.state.componentCards;
    const componentCards = cards.filter((c) => c.destinationElementId != card.destinationElementId);
    this.setState({componentCards});
  },
  mountComponentCard(card) {
    const { env, payload, postModel, cardName, isEditing } = card;
    const isInEditor = env.isInEditor,
          editCard   = env.edit,
          saveCard   = env.save,
          cancelCard = env.cancel,
          removeCard = env.remove;
    const component = React.createElement(card.component, {
      editor: this.editor,
      env,
      payload,
      postModel,
      cardName,
      isInEditor,
      isEditing,
      editCard,
      saveCard,
      cancelCard,
      removeCard
    });

    const destinationElement = document.getElementById(card.destinationElementId);
    if (destinationElement) {
      ReactDOM.render(component, destinationElement);
    }
  },
  addLink({href}) {
    this.editor.run(postEditor => {
      const markup = postEditor.builder.createMarkup('a', {href});
      postEditor.addMarkupToRange(this.state.linkOffsets, markup);
    });
  },
  setActiveTags() {
    this.setState({
      activeMarkupTags: this.editor.activeMarkups.map(m => m.tagName),
      // editor.activeSections are leaf sections.
      // Map parent section tag names (e.g. 'p', 'ul', 'ol') so that list buttons
      // are updated.
      activeSectionTags: this.editor.activeSections.map(s => {
        return s.isNested ? s.parent.tagName : s.tagName;
      })
    });
  }
});

export default Container;
