import React from 'react';
import MarkupControl from './MarkupControl';
import SectionControl from './SectionControl';
import LinkControl from './LinkControl';

const Toolbar = ({editor}) =>
  <ul>
    <li><MarkupControl editor={editor} tag='strong'></MarkupControl></li>
    <li><SectionControl editor={editor} tag='h1'></SectionControl></li>
    <li><LinkControl editor={editor}></LinkControl></li>
  </ul>;

export default Toolbar;
