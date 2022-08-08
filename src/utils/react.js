import ReactDOM from 'react-dom';

export function reactDomRender(CustomReactDOM, element, target) {
  const ResolvedReactDOM = CustomReactDOM || ReactDOM;
  const createRoot = ResolvedReactDOM.createRoot; // React 18+
  if (createRoot) {
    const root = createRoot(target);
    root.render(element);
    return root;
  } else {
    ResolvedReactDOM.render(element, target);
  }
}

export function reactDomUnmount(CustomReactDOM, root, target) {
  if (root) root.unmount();
  else (CustomReactDOM || ReactDOM).unmountComponentAtNode(target);
}
