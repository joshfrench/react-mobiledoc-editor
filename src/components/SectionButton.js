import React from 'react';
import classNames from 'classnames';
import titleCase from '../utils/titleCase';

const SectionButton = ({ tag = '', children = titleCase(tag), className, ...props }, { editor, activeSectionTags = []}) => {
  const onClick = () => editor.toggleSection(tag);
  className = classNames(className, {
    active: activeSectionTags.indexOf(tag.toLowerCase()) > -1
  });
  props = { ...props, onClick, className };
  return <button { ...props }>{children}</button>;
};

SectionButton.propTypes = {
  tag: React.PropTypes.string.isRequired,
  children: React.PropTypes.node
};

SectionButton.contextTypes = {
  editor: React.PropTypes.object,
  activeSectionTags: React.PropTypes.array
};

export default SectionButton;
