import PropTypes from 'prop-types';
import React from 'react';

import createReactClass from 'create-react-class';

const Editor = createReactClass({
  displayName: 'Editor',

  contextTypes: {
    editor: PropTypes.object
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
