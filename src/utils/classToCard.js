import React from 'react';
import ReactDOM from 'react-dom';

const cardRenderer = (component, isEditing=false) => ({env, payload}) => {
  const targetNode = document.createElement('div');

  const {didRender, onTeardown} = env;

  didRender(() => {
    payload = {...payload}; // deref payload
    const element = React.createElement(component, { ...env, payload, isEditing });
    ReactDOM.render(element, targetNode);
  });

  onTeardown(() => ReactDOM.unmountComponentAtNode(targetNode));

  return targetNode;
};

export const classToDOMCard = (component, name) => {
  if (!name && typeof component.displayName === 'undefined') {
    throw new Error("Can't create card from component, no displayName defined: " + component);
  }

  return {
    name: name || `${component.displayName}Card`,
    component,
    type: 'dom',
    render: cardRenderer(component),
    edit: cardRenderer(component, true)
  };
};
