import PropTypes from 'prop-types';
import React from 'react';

class Editor extends React.Component {
  static contextTypes = {
    editor: PropTypes.object
  }

  componentDidMount() {
    const { editor } = this.context;
    if (editor) {
      editor.render(this.editorEl);
    }
  }

  render() {
    return <div {...this.props} ref={r => (this.editorEl = r)} />;
  }
}

export default Editor;
