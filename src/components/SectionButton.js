import PropTypes from 'prop-types';
import React from 'react';
import titleCase from '../utils/titleCase';
import { ReactMobileDocContext } from "./Context";

const SectionButton = ({ tag = '', type = 'button', children = titleCase(tag), className, activeClassName = 'active', ...props }) => {
  return <ReactMobileDocContext.Consumer>
    {({ editor, activeSectionTags = []}) => {
      const onClick = () => editor.toggleSection(tag);
      className = [className, activeSectionTags.indexOf(tag.toLowerCase()) > -1 && activeClassName].filter(Boolean).join(' ');
      props = { type, ...props, onClick, className };
      return <button { ...props }>{children}</button>;
    }}
  </ReactMobileDocContext.Consumer>;
};

SectionButton.propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default SectionButton;
