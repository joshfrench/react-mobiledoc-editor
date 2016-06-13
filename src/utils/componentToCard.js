import React from 'react';
import ReactDOM from 'react-dom';

const elementToNode = (component, props) => {
  const element = React.createElement(component, props);
  const root = document.createElement('DIV');
  ReactDOM.render(element, root);
  return root.firstChild;
}

/**
 * TODO: accept options such as didRender callback
 */
export const componentToDOMCard = (name, component) => ({
  name,
  type: 'dom',
  render(cardArgs) {
    return elementToNode(component, cardArgs);
  },
  edit(cardArgs) {
    return elementToNode(component, {...cardArgs, isEditing: true});
  }
});
