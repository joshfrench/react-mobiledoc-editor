const atomRenderer = (component) => ({env, options, payload}) => {
  const {onTeardown} = env;

  const element = React.createElement(component, {
    ...env,
    ...options,
    payload: {...payload}
  });

  const targetNode = document.createElement('span');
  ReactDOM.render(element, targetNode);

  onTeardown(() => ReactDOM.unmountComponentAtNode(targetNode));

  return targetNode;
};

export const classToDOMAtom = (component) => {
  if (!component.displayName) {
    throw new Error(
      `Can't create card from component, no displayName defined:  + ${component}`
    );
  }

  return {
    name: component.displayName,
    component,
    type: 'dom',
    render: atomRenderer(component)
  };
};