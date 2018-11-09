import PropTypes from 'prop-types';
import React from 'react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.context;
    if (editor) {
      editor.render(this.editor.current);
    }
  }

  render() {
    const props = { ...this.props, ref: this.editor };
    return <div {...props} />;
  }
}

Editor.contextTypes = {
  editor: PropTypes.object
};

export default Editor;
