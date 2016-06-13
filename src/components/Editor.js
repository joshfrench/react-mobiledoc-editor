import React from 'react';
import ReactDOM from 'react-dom';

const Editor = React.createClass({
  contextTypes: {
    editor: React.PropTypes.object
  },
  componentDidMount() {
    const {editor} = this.context;
    if (editor) {
      editor.render(ReactDOM.findDOMNode(this));
    }
  },
  render() {
    return <div />;
  }
});

export default Editor;
