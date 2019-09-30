import React from 'react';
import MarkupButton from './MarkupButton';
import SectionButton from './SectionButton';
import LinkButton from './LinkButton';
import SectionSelect from './SectionSelect';
import AttributeSelect from './AttributeSelect';
import AttributeButton from './AttributeButton';

const Toolbar = (props) =>
  <ul {...props}>
    <li><MarkupButton tag='strong' /></li>
    <li><MarkupButton tag='em' /></li>
    <li><LinkButton /></li>
    <li>Style: <SectionSelect tags={["h1", "h2", "h3"]} /></li>
    <li>Alignment: <AttributeSelect attribute='text-align' values={["left", "center", "right"]} /></li>
    <li><AttributeButton attribute='text-align' value={"left"} /></li>
    <li><SectionButton tag='blockquote' /></li>
    <li><SectionButton tag='ul'>UL</SectionButton></li>
    <li><SectionButton tag='ol'>OL</SectionButton></li>
  </ul>;

export default Toolbar;
