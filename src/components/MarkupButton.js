import PropTypes from 'prop-types';
import React from 'react';
import titleCase from '../utils/titleCase';
import { ReactMobileDocContext } from './Context';

const MarkupButton = ({
  tag = '',
  type = 'button',
  children = titleCase(tag),
  className,
  activeClassName = 'active',
  ...props
}) => {
  return (
    <ReactMobileDocContext.Consumer>
      {({ editor, activeMarkupTags = [] }) => {
        const onClick = () => editor.toggleMarkup(tag);
        const currentClassName = [
          className,
          activeMarkupTags.indexOf(tag.toLowerCase()) > -1 && activeClassName,
        ]
          .filter(Boolean)
          .join(' ');
        props = { type, ...props, onClick, className: currentClassName };
        return <button {...props}>{children}</button>;
      }}
    </ReactMobileDocContext.Consumer>
  );
};

MarkupButton.propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default MarkupButton;
