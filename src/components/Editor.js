import React from 'react';

const Editor = React.createClass({
  componentWillMount() {
    if (typeof this.props.willCreateEditor === 'function') {
      this.props.willCreateEditor();
    }
  },
  componentDidMount() {
    this.props.editor && this.props.editor.render(this.refs.editor);
    if (typeof this.props.didCreateEditor === 'function') {
      this.props.didCreateEditor(this.props.editor);
    }
  },
  render() {
    return <div ref="editor" />;
  }
});

export default Editor;
