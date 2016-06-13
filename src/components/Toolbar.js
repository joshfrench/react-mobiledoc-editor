import React from 'react';
import MarkupControl from './MarkupControl';
import SectionControl from './SectionControl';
import LinkControl from './LinkControl';

const Toolbar = ({editor}) =>
  <ul>
    <li><MarkupControl editor={editor} tag='strong'></MarkupControl></li>
    <li><MarkupControl editor={editor} tag='em'></MarkupControl></li>
    <li><LinkControl editor={editor}></LinkControl></li>
    <li><MarkupControl editor={editor} tag='em'></MarkupControl></li>
    <li><SectionControl editor={editor} tag='h1'></SectionControl></li>
    <li><SectionControl editor={editor} tag='h2'></SectionControl></li>
    <li><SectionControl editor={editor} tag='blockquote'></SectionControl></li>
    <li><SectionControl editor={editor} tag='ul'></SectionControl></li>
    <li><SectionControl editor={editor} tag='ol'></SectionControl></li>
  </ul>;

export default Toolbar;
