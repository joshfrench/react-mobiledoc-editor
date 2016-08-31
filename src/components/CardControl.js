import React from 'react';
import titleCase from '../utils/titleCase';

const CardControl = ({ card, edit, isEditing = true, payload = {}, children, ...props }, { editor }) => {
  if (!children) {
    const name = card.name.replace(/[_-]?card$/i, '');
    children = <button {...props}>{titleCase(name)}</button>;
  }
  const onClick = () => editor.insertCard(card.name, payload, isEditing);
  return React.cloneElement(children, { onClick });
};

CardControl.propTypes = {
  card: React.PropTypes.object.isRequired,
  edit: React.PropTypes.bool,
  payload: React.PropTypes.object,
  children: React.PropTypes.element
};

CardControl.contextTypes = {
  editor: React.PropTypes.object
};

export default CardControl;
