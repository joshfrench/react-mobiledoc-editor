import ReactDOM from 'react-dom';

const supportsReact18 = !!ReactDOM.createRoot;

export function reactDomRender(element, target) {
  if (supportsReact18) {
    const root = ReactDOM.createRoot(target);
    root.render(element);
    return root;
  } else {
    ReactDOM.render(element, target);
  }
}

export function reactDomUnmount(root, target) {
  if (root) root.unmount();
  else ReactDOM.unmountComponentAtNode(target);
}
