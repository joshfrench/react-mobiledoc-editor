import React from 'react';
import classNames from 'classnames';
import { UI } from 'mobiledoc-kit';

const LinkButton = ({ children = "Link", className, ...props }, { editor, activeMarkupTags = []}) => {
  const onClick = () => {
    if (!editor.hasCursor()) {
      return;
    }

    if (editor.hasActiveMarkup('a')) {
      editor.toggleMarkup('a');
    } else {
      UI.toggleLink(editor);
    }
  };

  className = classNames(className, {
    active: activeMarkupTags.indexOf('a') > -1
  });

  props = { ...props, onClick, className };
  return <button { ...props }>{children}</button>;
};

LinkButton.propTypes = {
  children: React.PropTypes.node
};

LinkButton.contextTypes = {
  editor: React.PropTypes.object,
  activeMarkupTags: React.PropTypes.array
};

export default LinkButton;
