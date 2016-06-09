import React from 'react';

const SectionControl = ({editor, tag, children}) => {
  const onClick = () => editor.toggleSection(tag);
  return React.cloneElement(children, {onClick});
};

export default SectionControl;
