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
    render(cardArgs) {
      const {env, options} = cardArgs;
      if (!options.addComponent) {
        return renderFallback(doc);
      }

      const {card, destinationElement} = options.addComponent(component, cardArgs);
      const {onTeardown} = env;

      onTeardown(() => options.removeComponent(card));
      return destinationElement;
    },
    edit(cardArgs) {
      const {env, options} = cardArgs;
      if (!options.addComponent) {
        return renderFallback(doc);
      }

      const isEditing = true;
      const { card, destinationElement } = options.addComponent(component, cardArgs, isEditing);
      const { onTeardown } = env;

      onTeardown(() => options.removeComponent(card));

      return destinationElement;
    }
  };
};
