import React from 'react';
import MarkupControl from './MarkupControl';
import SectionControl from './SectionControl';
import LinkControl from './LinkControl';

const Toolbar = () =>
  <ul>
    <li><MarkupControl tag='strong' /></li>
    <li><MarkupControl tag='em' /></li>
    <li><LinkControl /></li>
    <li><MarkupControl tag='em' /></li>
    <li><SectionControl tag='h1' /></li>
    <li><SectionControl tag='h2' /></li>
    <li><SectionControl tag='blockquote' /></li>
    <li><SectionControl tag='ul' /></li>
    <li><SectionControl tag='ol' /></li>
  </ul>;

export default Toolbar;
