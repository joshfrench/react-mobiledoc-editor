import PropTypes from 'prop-types';
import React from 'react';
import * as Mobiledoc from 'mobiledoc-kit';
import { LATEST_MOBILEDOC_VERSION, EMPTY_MOBILEDOC } from '../utils/mobiledoc';
import { ReactMobileDocContext } from './Context';

class Container extends React.Component {
  static defaultProps = {
    atoms: [],
    autofocus: true,
    cardProps: {},
    cards: [],
    placeholder: '',
    serializeVersion: LATEST_MOBILEDOC_VERSION,
    spellcheck: true,
  };

  constructor() {
    super(...arguments);

    if (typeof this.props.willCreateEditor === 'function') {
      this.props.willCreateEditor();
    }

    const {
      atoms,
      autofocus,
      cardProps,
      cards,
      html,
      placeholder,
      serializeVersion,
      spellcheck,
      createRoot,
    } = this.props;
    const mobiledoc =
      this.props.mobiledoc || (html ? undefined : EMPTY_MOBILEDOC);

    const editorOptions = {
      ...this.props.options,
      atoms,
      autofocus,
      cardOptions: { cardProps, createRoot },
      cards,
      html,
      mobiledoc,
      placeholder,
      serializeVersion,
      spellcheck,
    };
    this.editor = new Mobiledoc.Editor(editorOptions);

    this.editor.inputModeDidChange(this.setActiveTags);
    this.editor.postDidChange(() => {
      this.handleChange();
    });

    if (typeof this.props.didCreateEditor === 'function') {
      this.props.didCreateEditor(this.editor);
    }
  }

  state = {
    activeMarkupTags: [],
    activeSectionTags: [],
    activeSectionAttributes: [],
  };

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    /* eslint-disable no-unused-vars */
    /* deconstruct out non-React props before passing to children */
    const {
      atoms,
      autofocus,
      cardProps,
      cards,
      children,
      didCreateEditor,
      html,
      mobiledoc,
      options,
      placeholder,
      serializeVersion,
      spellcheck,
      willCreateEditor,
      onChange,
      createRoot,
      ...componentProps
    } = this.props;
    /* eslint-enable no-unused-vars */
    return (
      <div {...componentProps}>
        <ReactMobileDocContext.Provider
          value={{
            editor: this.editor,
            activeMarkupTags: this.state.activeMarkupTags,
            activeSectionTags: this.state.activeSectionTags,
            activeSectionAttributes: this.state.activeSectionAttributes,
          }}
        >
          {children}
        </ReactMobileDocContext.Provider>
      </div>
    );
  }

  setActiveTags = () => {
    this.setState({
      activeSectionAttributes: this.editor.activeSections.map((s) => {
        return s.attributes || {};
      }),
      activeMarkupTags: this.editor.activeMarkups.map((m) => m.tagName),
      // editor.activeSections are leaf sections.
      // Map parent section tag names (e.g. 'p', 'ul', 'ol') so that list buttons
      // are updated.
      activeSectionTags: this.editor.activeSections.map((s) => {
        return s.isNested ? s.parent.tagName : s.tagName;
      }),
    });
  };

  handleChange = () => {
    if (typeof this.props.onChange === 'function') {
      const mobiledoc = this.editor.serialize(this.props.serializeVersion);
      this.props.onChange(mobiledoc);
    }
  };
}

Container.propTypes = {
  atoms: PropTypes.array,
  autofocus: PropTypes.bool,
  cards: PropTypes.array,
  didCreateEditor: PropTypes.func,
  html: PropTypes.string,
  mobiledoc: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  serializeVersion: PropTypes.string,
  spellcheck: PropTypes.bool,
  willCreateEditor: PropTypes.func,
};

export default Container;
