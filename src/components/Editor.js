import React from 'react';
import ReactDOM from 'react-dom';

const Editor = React.createClass({
  componentDidMount() {
    const {editor} = this.props;
    if (editor) {
      editor.render(ReactDOM.findDOMNode(this));
    }
  },
  render() {
    return <div />;
  }
});

export default Editor;
