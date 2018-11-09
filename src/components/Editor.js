import PropTypes from 'prop-types';
import React from 'react';

class Editor extends React.Component {
  componentDidMount() {
    const { editor } = this.context;
    if (editor) {
      editor.render(this.refs.editor);
    }
  }

  render() {
    const props = { ...this.props, ref: "editor" };
    return <div {...props} />;
  }
}

Editor.contextTypes = {
  editor: PropTypes.object
};

export default Editor;
