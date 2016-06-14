import React from 'react';
import titleCase from '../utils/titleCase';

const CardControl = ({card, edit=true, payload={}, children}, {editor}) => {
  if (!children) {
    children = <button>{titleCase(card.name.replace(/[_-]?card$/i,''))}</button>;
  }
  const onClick = () => editor.insertCard(card.name, payload, edit);
  return React.cloneElement(children, {onClick});
};

CardControl.contextTypes = {
  editor: React.PropTypes.object
};

export default CardControl;
