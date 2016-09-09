import React from 'react';
import classNames from 'classnames';

const LinkButton = ({ children = "Link", className, ...props }, { editor, setLinkOffsets, activeMarkupTags = []}) => {
  const onClick = () => {
    if (!editor.hasCursor()) {
      return;
    }

    if (editor.hasActiveMarkup('a')) {
      editor.toggleMarkup('a');
    } else {
      setLinkOffsets(editor.range);
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
  setLinkOffsets: React.PropTypes.func,
  activeMarkupTags: React.PropTypes.array
};

export default LinkButton;
