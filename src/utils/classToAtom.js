import React from 'react';
import ReactDOM from 'react-dom';

const atomRenderer = (component) => ({ env, options, payload, value }) => {
  const { onTeardown } = env;

  const element = React.createElement(component, {
    ...env,
    ...options,
    value,
    payload: { ...payload }
  });

  const targetNode = document.createElement('span');
  ReactDOM.render(element, targetNode);

  onTeardown(() => ReactDOM.unmountComponentAtNode(targetNode));

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
    render: atomRenderer(component)
  };
};
