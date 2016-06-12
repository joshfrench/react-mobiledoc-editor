import React from 'react';
import classNames from 'classnames';
import titleCase from '../utils/titleCase';

const SectionControl = ({editor, tag='', children=<button>{titleCase(tag)}</button>}, {activeSectionTags=[]}) => {
  const onClick = () => editor.toggleSection(tag);
  const className = classNames(children.props.className, {
    active: activeSectionTags.indexOf(tag.toLowerCase()) > -1
  });
  return React.cloneElement(children, {onClick, className});
};

SectionControl.contextTypes = {
  activeSectionTags: React.PropTypes.array
}

export default SectionControl;
