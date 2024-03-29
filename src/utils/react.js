import ReactDOM from 'react-dom';

export function reactDomRender(createRoot, element, target) {
  // React 18+
  if (createRoot) {
    const root = createRoot(target);
    root.render(element);
    return root;
  } else {
    ReactDOM.render(element, target);
  }
}

export function reactDomUnmount(root, target) {
  if (root) root.render(null); // React 18+
  else ReactDOM.unmountComponentAtNode(target);
}
