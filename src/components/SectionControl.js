import React from 'react';
import titleCase from '../utils/titleCase';

const SectionControl = ({editor, tag, children=<button>{titleCase(tag)}</button>}) => {
  const onClick = () => editor.toggleSection(tag);
  return React.cloneElement(children, {onClick});
};

export default SectionControl;
