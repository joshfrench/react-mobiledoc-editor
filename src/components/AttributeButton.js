import PropTypes from 'prop-types';
import React from 'react';
import titleCase from '../utils/titleCase';
import getActiveAttribute from '../utils/getActiveAttribute';

const AttributeButton = ({ attribute = 'text-align', type = 'button', value = '', defaultValue = 'left', children = titleCase(value), className, activeClassName = 'active', ...props }, { editor, activeSectionAttributes = []}) => {
  const onClick = () => editor.setAttribute(attribute, value);
  const activeAttribute = getActiveAttribute(activeSectionAttributes, attribute, defaultValue);

  className = [className, activeAttribute === value && activeClassName].filter(Boolean).join(' ');
  props = { type, ...props, onClick, className };
  return <button { ...props }>{children}</button>;
};

AttributeButton.propTypes = {
  attribute: PropTypes.string.isRequired,
  children: PropTypes.node
};

AttributeButton.contextTypes = {
  editor: PropTypes.object,
  activeSectionAttributes: PropTypes.array
};

export default AttributeButton;
