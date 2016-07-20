import React from 'react';
import MarkupControl from './MarkupControl';
import SectionControl from './SectionControl';
import LinkControl from './LinkControl';

const Toolbar = ({ children, ...props }) =>
  <ul {...props}>
    <li><MarkupControl tag='strong' /></li>
    <li><MarkupControl tag='em' /></li>
    <li><LinkControl /></li>
    <li><SectionControl tag='h1' /></li>
    <li><SectionControl tag='h2' /></li>
    <li><SectionControl tag='blockquote' /></li>
    <li><SectionControl tag='pull-quote' /></li>
    <li><SectionControl tag='ul' /></li>
    <li><SectionControl tag='ol' /></li>
    {React.Children.map(children, (child) => <li>{child}</li>)}
  </ul>;

export default Toolbar;
