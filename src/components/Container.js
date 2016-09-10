import React from 'react';
import Mobiledoc from 'mobiledoc-kit';

export const EMPTY_MOBILEDOC = {
  version: "0.3.0",
  markups: [],
  atoms: [],
  cards: [],
  sections: []
};

const Container = React.createClass({
  propTypes: {
    atoms: React.PropTypes.array,
    autofocus: React.PropTypes.bool,
    cards: React.PropTypes.array,
    didCreateEditor: React.PropTypes.func,
    html: React.PropTypes.string,
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
      atoms: [],
      autofocus: true,
      cardProps: {},
      cards: [],
      placeholder: "",
      serializeVersion: "0.3.0",
      spellcheck: true
    };
  },
  getInitialState() {
    return {
      activeMarkupTags: [],
      activeSectionTags: []
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
    const { atoms, autofocus, cardProps, cards, html, placeholder, serializeVersion, spellcheck } = this.props;
    const editorOptions = { ...this.props.options, atoms, autofocus, cardOptions: { cardProps }, cards, html, mobiledoc, placeholder, serializeVersion, spellcheck };
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
  componentWillUnmount() {
    this.editor.destroy();
  },
  render() {
    /* eslint-disable no-unused-vars */
    /* deconstruct out non-React props before passing to children */
    const { atoms, autofocus, cardProps, cards, children, didCreateEditor, html, mobiledoc,
            placeholder, serializeVersion, spellcheck, willCreateEditor, ...componentProps } = this.props;
    /* eslint-enable no-unused-vars */
    return <div {...componentProps}>{children}</div>;
  },
  addLink({ href }) {
    this.editor.run(postEditor => {
      const markup = postEditor.builder.createMarkup('a', { href });
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
