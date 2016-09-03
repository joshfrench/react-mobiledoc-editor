import React from 'react';
import titleCase from '../utils/titleCase';

const CardControl = ({ card, edit, isEditing = true, payload = {}, children, ...props }, { editor }) => {
  if (!children) {
    children = <button {...props}>{titleCase(card.name)}</button>;
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
