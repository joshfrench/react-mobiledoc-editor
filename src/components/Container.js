import React from 'react';

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
  render() {
    return <div>{this.props.children}</div>;
  },
  addLink({href}) {
    this.props.editor.run(postEditor => {
      const markup = postEditor.builder.createMarkup('a', {href});
      postEditor.addMarkupToRange(this.state.linkOffsets, markup);
    });
  }
});

export default Container;
