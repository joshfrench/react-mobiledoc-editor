import React from 'react';
import { reactDomRender, reactDomUnmount } from './react';

const cardRenderer =
  (component, isEditing = false) =>
  ({ env, options, payload }) => {
    const targetNode = document.createElement('div');
    const { didRender, onTeardown } = env;
    let root;

    didRender(() => {
      payload = { ...payload }; // deref payload
      const { cardProps } = options;
      const element = React.createElement(component, {
        ...env,
        ...cardProps,
        payload,
        isEditing,
      });
      root = reactDomRender(element, targetNode);
    });

    onTeardown(() => reactDomUnmount(root, targetNode));

    return targetNode;
  };

export const classToDOMCard = (component) => {
  if (!component.displayName) {
    throw new Error(
      "Can't create card from component, no displayName defined: " + component
    );
  }

  return {
    name: component.displayName,
    component,
    type: 'dom',
    render: cardRenderer(component),
    edit: cardRenderer(component, true),
  };
};
