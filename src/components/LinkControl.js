import React from 'react';
import classNames from 'classnames';

const LinkControl = ({ children = <button>Link</button>, ...props }, { editor, setLinkOffsets, activeMarkupTags = []}) => {
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

  const className = classNames(children.props.className, {
    active: activeMarkupTags.indexOf('a') > -1
  });

  return React.cloneElement(children, { ...props, onClick, className });
};

LinkControl.propTypes = {
  children: React.PropTypes.element
};

LinkControl.contextTypes = {
  editor: React.PropTypes.object,
  setLinkOffsets: React.PropTypes.func,
  activeMarkupTags: React.PropTypes.array
};

export default LinkControl;
