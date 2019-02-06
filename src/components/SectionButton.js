import PropTypes from 'prop-types';
import React from 'react';
import titleCase from '../utils/titleCase';

const SectionButton = ({ tag = '', type = 'button', children = titleCase(tag), className, activeClassName = 'active', ...props }, { editor, activeSectionTags = []}) => {
  const onClick = () => editor.toggleSection(tag);
  className = [className, activeSectionTags.indexOf(tag.toLowerCase()) > -1 && activeClassName].filter(Boolean).join(' ');
  props = { type, ...props, onClick, className };
  return <button { ...props }>{children}</button>;
};

SectionButton.propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.node
};

SectionButton.contextTypes = {
  editor: PropTypes.object,
  activeSectionTags: PropTypes.array
};

export default SectionButton;
