import React from 'react';

const Container = React.createClass({
  childContextTypes: {
    linkOffsets: React.PropTypes.object,
    setLinkOffsets: React.PropTypes.func
  },
  getInitialState() {
    return {};
  },
  getChildContext() {
    return {
      linkOffsets: this.state.linkOffsets,
      setLinkOffsets: (range) => this.setState({ linkOffsets: range })
    };
  },
  render() {
    return <div>{this.props.children}</div>;
  }
});

export default Container;
