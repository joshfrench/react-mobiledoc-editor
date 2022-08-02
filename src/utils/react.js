let ReactDOM;
let supportsReact18 = false;

try {
  ReactDOM = require('react-dom/client');
  supportsReact18 = true;
} catch {
  ReactDOM = require('react-dom');
}

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
