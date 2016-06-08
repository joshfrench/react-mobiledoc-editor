import React from 'react';
import MobileDoc from 'mobiledoc-kit';
import MarkupControl from './MarkupControl';
import SectionControl from './SectionControl';
import LinkControl from './LinkControl';
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
        <ul>
          <li><MarkupControl editor={this.editor} tag='strong'><button>B</button></MarkupControl></li>
          <li><SectionControl editor={this.editor} tag='h1'><button>H1</button></SectionControl></li>
          <li><LinkControl editor={this.editor}><button>A</button></LinkControl></li>
        </ul>
        <div ref="editor" />
        <LinkForm editor={this.editor} />
      </div>
    )
  }
});

export default Editor;
