import React from 'react';
import MarkupButton from './MarkupButton';
import SectionButton from './SectionButton';
import LinkButton from './LinkButton';

const Toolbar = (props) =>
  <ul {...props}>
    <li><MarkupButton tag='strong' /></li>
    <li><MarkupButton tag='em' /></li>
    <li><LinkButton /></li>
    <li><SectionButton tag='h1' /></li>
    <li><SectionButton tag='h2' /></li>
    <li><SectionButton tag='blockquote' /></li>
    <li><SectionButton tag='pull-quote' /></li>
    <li><SectionButton tag='ul' /></li>
    <li><SectionButton tag='ol' /></li>
  </ul>;

export default Toolbar;
