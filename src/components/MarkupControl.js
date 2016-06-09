import React from 'react';

const MarkupControl = ({editor, tag, children}) => {
  const onClick = () => editor.toggleMarkup(tag);
  return React.cloneElement(children, {onClick});
};

export default MarkupControl;
