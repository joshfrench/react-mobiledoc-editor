import PropTypes from 'prop-types';
import React from 'react';

class Editor extends React.Component {
  static contextTypes = {
    editor: PropTypes.object
  }

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

export default Editor;
