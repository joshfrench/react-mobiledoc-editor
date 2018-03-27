import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { UI } from 'mobiledoc-kit';

const LinkButton = ({ children = "Link", type = "button", handler, className, ...props }, { editor, activeMarkupTags = []}) => {
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

  className = classNames(className, {
    active: activeMarkupTags.indexOf('a') > -1
  });

  props = { type, ...props, onClick, className };
  return <button { ...props }>{children}</button>;
};

LinkButton.propTypes = {
  children: PropTypes.node
};

LinkButton.contextTypes = {
  editor: PropTypes.object,
  activeMarkupTags: PropTypes.array
};

export default LinkButton;
