import React from 'react';
import MobileDoc from 'mobiledoc-kit';
import Toolbar from './Toolbar';
import LinkForm from './LinkForm';

const Editor = React.createClass({
  getInitialState() {
    return {};
  },
  getChildContext() {
    return {
      linkOffsets: this.state.linkOffsets,
      setLinkOffsets: (range) => { this.setState({ linkOffsets: range }); }
    };
  },
  childContextTypes: {
    linkOffsets: React.PropTypes.object,
    setLinkOffsets: React.PropTypes.func
  },
  componentWillMount() {
    this.editor = new MobileDoc.Editor({ mobiledoc: this.props.doc });
    this.editor.postDidChange(() => { console.log(this.editor.serialize()) });
  },
  componentDidMount() {
    this.editor.render(this.refs.editor);
  },
  render() {
    return (
      <div>
        <Toolbar editor={this.editor} />
        <div ref="editor" />
        {this.state.linkOffsets && <LinkForm editor={this.editor} />}
      </div>
    )
  }
});

export default Editor;
