import React from 'react';
import MobileDoc from 'mobiledoc-kit';

const Editor = React.createClass({
  propTypes: {
    editor: React.PropTypes.instanceOf(MobileDoc.Editor).isRequired
  },
  componentDidMount() {
    this.props.editor.render(this.refs.editor);
  },
  render() {
    return <div ref="editor" />;
  }
});

export default Editor;
