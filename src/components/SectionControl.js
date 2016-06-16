import React from 'react';
import classNames from 'classnames';
import titleCase from '../utils/titleCase';

const SectionControl = ({tag='', children=<button>{titleCase(tag)}</button>, ...props}, {editor, activeSectionTags=[]}) => {
  const onClick = () => editor.toggleSection(tag);
  const className = classNames(children.props.className, {
    active: activeSectionTags.indexOf(tag.toLowerCase()) > -1
  });
  return React.cloneElement(children, {...props, onClick, className});
};

SectionControl.propTypes = {
  tag: React.PropTypes.string.isRequired,
  children: React.PropTypes.element
};

SectionControl.contextTypes = {
  editor: React.PropTypes.object,
  activeSectionTags: React.PropTypes.array
};

export default SectionControl;
