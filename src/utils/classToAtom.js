import React from 'react';
import { reactDomRender, reactDomUnmount } from './react';

const atomRenderer =
  (component) =>
  ({ env, options, payload, value }) => {
    const { onTeardown } = env;
    const { ReactDOM } = options;

    const element = React.createElement(component, {
      ...env,
      ...options,
      value,
      payload: { ...payload },
    });

    const targetNode = document.createElement('span');
    const root = reactDomRender(ReactDOM, element, targetNode);

    onTeardown(() => reactDomUnmount(ReactDOM, root, targetNode));

    return targetNode;
  };

export const classToDOMAtom = (component) => {
  if (!component.displayName) {
    throw new Error(
      `Can't create atom from component, no displayName defined: ${component}`
    );
  }

  return {
    name: component.displayName,
    component,
    type: 'dom',
    render: atomRenderer(component),
  };
};
