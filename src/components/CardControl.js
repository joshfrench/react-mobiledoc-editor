import React from 'react';
import titleCase from '../utils/titleCase';

const CardControl = ({card, edit=true, payload={}, children, ...props}, {editor}) => {
  if (!children) {
    const name = card.name.replace(/[_-]?card$/i, '');
    children = <button {...props}>{titleCase(name)}</button>;
  }
  const onClick = () => editor.insertCard(card.name, payload, edit);
  return React.cloneElement(children, {onClick});
};

CardControl.contextTypes = {
  editor: React.PropTypes.object
};

export default CardControl;
