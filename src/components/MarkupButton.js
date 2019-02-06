import PropTypes from 'prop-types';
import React from 'react';
import titleCase from '../utils/titleCase';

const MarkupButton = ({ tag = '', type = 'button', children = titleCase(tag), className, activeClassName = 'active', ...props }, { editor, activeMarkupTags = []}) => {
  const onClick = () => editor.toggleMarkup(tag);
  className = [className, activeMarkupTags.indexOf(tag.toLowerCase()) > -1 && activeClassName].filter(Boolean).join(' ');
  props = { type, ...props, onClick, className };
  return <button { ...props }>{children}</button>;
};

MarkupButton.propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.node
};

MarkupButton.contextTypes = {
  editor: PropTypes.object,
  activeMarkupTags: PropTypes.array
};

export default MarkupButton;
