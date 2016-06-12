import React from 'react';
import Mobiledoc from 'mobiledoc-kit';

const EMPTY_MOBILEDOC = {
  version: "0.3.0",
  markups: [],
  atoms: [],
  cards: [],
  sections: []
};

const Container = React.createClass({
  childContextTypes: {
    linkOffsets: React.PropTypes.object,
    setLinkOffsets: React.PropTypes.func,
    addLink: React.PropTypes.func
  },
  getInitialState() {
    return {};
  },
  getChildContext() {
    return {
      linkOffsets: this.state.linkOffsets,
      setLinkOffsets: (range) => this.setState({ linkOffsets: range }),
      addLink: this.addLink
    };
  },
  componentWillMount() {
    if (typeof this.props.willCreateEditor === 'function') {
      this.props.willCreateEditor();
    }
    this.editor = new Mobiledoc.Editor({mobiledoc: this.props.mobiledoc || EMPTY_MOBILEDOC});
  },
  componentDidMount() {
    if (typeof this.props.didCreateEditor === 'function') {
      this.props.didCreateEditor(this.editor);
    }
  },
  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {editor: this.editor});
    });
    return <div>{children}</div>;
  },
  addLink({href}) {
    this.props.editor.run(postEditor => {
      const markup = postEditor.builder.createMarkup('a', {href});
      postEditor.addMarkupToRange(this.state.linkOffsets, markup);
    });
  }
});

export default Container;
