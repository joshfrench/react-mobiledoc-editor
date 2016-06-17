import {ADD_ATOM_HOOK, REMOVE_ATOM_HOOK} from '../components/Container';

const renderFallback = (doc) => {
  const element = doc.createElement('span');
  const text = doc.createTextNode('[placeholder for React component atom]');
  element.appendChild(text);
  return element;
};

export const classToDOMAtom = (component, name, doc=window.document) => {
  if (!name && typeof component.displayName === 'undefined') {
    throw new Error("Can't create atom from component, no displayName defined: " + component);
  }

  return {
    name: name || `${component.displayName}Atom`,
    component,
    type: 'dom',
    render(atomArg) {
      const {env, options} = atomArg;
      if (!options[ADD_ATOM_HOOK]) {
        return renderFallback(doc);
      }

      const { atom, destinationElement } = options[ADD_ATOM_HOOK](component, atomArg);
      const { onTeardown } = env;

      onTeardown(() => options[REMOVE_ATOM_HOOK](atom));

      return destinationElement;
    }
  };
};
