import React from 'react';

const Editor = React.createClass({
  contextTypes: {
    editor: React.PropTypes.object
  },
  componentDidMount() {
    const { editor } = this.context;
    if (editor) {
      editor.render(this.refs.editor);
    }
  },
  render() {
    const props = { ...this.props, ref: "editor" };
    return <div {...props} />;
  }
});

export default Editor;
