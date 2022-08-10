import PropTypes from 'prop-types';
import React from 'react';
import { UI } from 'mobiledoc-kit';
import { ReactMobileDocContext } from './Context';

const LinkButton = ({
  children = 'Link',
  type = 'button',
  handler,
  className,
  activeClassName = 'active',
  ...props
}) => {
  return (
    <ReactMobileDocContext.Consumer>
      {({ editor, activeMarkupTags = [] }) => {
        const onClick = () => {
          if (!editor.hasCursor()) {
            return;
          }

          if (editor.hasActiveMarkup('a')) {
            editor.toggleMarkup('a');
          } else {
            UI.toggleLink(editor, handler);
          }
        };

        const currentClassName = [
          className,
          activeMarkupTags.indexOf('a') > -1 && activeClassName,
        ]
          .filter(Boolean)
          .join(' ');

        props = { type, ...props, onClick, className: currentClassName };
        return <button {...props}>{children}</button>;
      }}
    </ReactMobileDocContext.Consumer>
  );
};

LinkButton.propTypes = {
  children: PropTypes.node,
};

export default LinkButton;
