import React from 'react';
import titleCase from '../utils/titleCase';

// TODO: Click again to replace atom with plain text value? May not apply to all atoms (BR, HR, &c)

const AtomControl = ({ atom = '', value = null, payload = null, children = <button>{titleCase(atom)}</button>, ...props }, { editor }) => {
  const onClick = () => editor.insertAtom(atom, value, payload);
  return React.cloneElement(children, { ...props, onClick });
};

AtomControl.propTypes = {
  atom: React.PropTypes.string.isRequired,
  children: React.PropTypes.element
};

AtomControl.contextTypes = {
  editor: React.PropTypes.object
};

export default AtomControl;
