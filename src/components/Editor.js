import React from 'react';

const Editor = React.createClass({
  componentDidMount() {
    this.props.editor.render(this.refs.editor);
  },
  render() {
    return <div ref="editor" />;
  }
});

export default Editor;
