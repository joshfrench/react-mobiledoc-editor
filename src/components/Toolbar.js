import React from 'react';
import MarkupControl from './MarkupControl';
import SectionControl from './SectionControl';
import LinkControl from './LinkControl';

const Toolbar = ({editor}) =>
  <ul>
    <li><MarkupControl editor={editor} tag='strong'><button>b</button></MarkupControl></li>
    <li><SectionControl editor={editor} tag='h1'><button>h1</button></SectionControl></li>
    <li><LinkControl editor={editor}><button>a</button></LinkControl></li>
  </ul>;

export default Toolbar;
