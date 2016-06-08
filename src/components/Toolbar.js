import React from 'react';
import {Editor} from 'mobiledoc-kit';
import MarkupControl from './MarkupControl';
import SectionControl from './SectionControl';
import LinkControl from './LinkControl';

const Toolbar = React.createClass({
  propTypes: {
    editor: React.PropTypes.instanceOf(Editor).isRequired
  },
  render () {
    const {editor} = this.props;
    return (
      <ul>
        <li><MarkupControl editor={editor} tag='strong'><button>b</button></MarkupControl></li>
        <li><SectionControl editor={editor} tag='h1'><button>h1</button></SectionControl></li>
        <li><LinkControl editor={editor}><button>a</button></LinkControl></li>
      </ul>
    );
  }
});

export default Toolbar;
