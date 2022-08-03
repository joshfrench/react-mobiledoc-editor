import React from 'react';
import { reactDomRender, reactDomUnmount } from './react';

const cardRenderer =
  (ReactDOM, component, isEditing = false) =>
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
      root = reactDomRender(ReactDOM, element, targetNode);
    });

    onTeardown(() => reactDomUnmount(ReactDOM, root, targetNode));

    return targetNode;
  };

export const classToDOMCard = (component, ReactDOM) => {
  if (!component.displayName) {
    throw new Error(
      "Can't create card from component, no displayName defined: " + component
    );
  }

  return {
    name: component.displayName,
    component,
    type: 'dom',
    render: cardRenderer(ReactDOM, component),
    edit: cardRenderer(ReactDOM, component, true),
  };
};
