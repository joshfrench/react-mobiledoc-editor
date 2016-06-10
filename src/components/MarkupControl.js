import React from 'react';
import titleCase from '../utils/titleCase';

const MarkupControl = ({editor, tag, children=<button>{titleCase(tag)}</button>}) => {
  const onClick = () => editor.toggleMarkup(tag);
  return React.cloneElement(children, {onClick});
};

export default MarkupControl;
