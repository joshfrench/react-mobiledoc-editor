import {ADD_CARD_HOOK, REMOVE_CARD_HOOK} from '../components/Container';

const renderFallback = (doc) => {
  const element = doc.createElement('div');
  const text = doc.createTextNode('[placeholder for React component card]');
  element.appendChild(text);
  return element;
};

export const classToDOMCard = (component, name, doc=window.document) => {
  if (!name && typeof component.displayName === 'undefined') {
    throw new Error("Can't create card from component, no displayName defined: " + component);
  }

  return {
    name: name || `${component.displayName}Card`,
    component,
    type: 'dom',
    render(cardArg) {
      const {env, options} = cardArg;
      if (!options[ADD_CARD_HOOK]) {
        return renderFallback(doc);
      }

      const {card, destinationElement} = options[ADD_CARD_HOOK](component, cardArg);
      const {onTeardown} = env;

      onTeardown(() => options[REMOVE_CARD_HOOK](card));
      return destinationElement;
    },
    edit(cardArg) {
      const {env, options} = cardArg;
      if (!options[ADD_CARD_HOOK]) {
        return renderFallback(doc);
      }

      const isEditing = true;
      const { card, destinationElement } = options[ADD_CARD_HOOK](component, cardArg, isEditing);
      const { onTeardown } = env;

      onTeardown(() => options[REMOVE_CARD_HOOK](card));

      return destinationElement;
    }
  };
};
