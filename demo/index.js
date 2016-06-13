import React from 'react';
import ReactDOM from 'react-dom';

import * as ReactMobiledoc from '../src';

const elementToNode = (component, props) => {
  const element = React.createElement(component, props);
  const root = document.createElement('DIV');
  ReactDOM.render(element, root);
  return root.firstChild;
}

const componentToCard = (name, component) => ({
  name,
  type: 'dom',
  render(cardArgs) {
    return elementToNode(component, cardArgs);
  },
  edit(cardArgs) {
    return elementToNode(component, {...cardArgs, isEditing: true});
  }
});

// const Stateless = ({env, options, payload, isEditing}) => {
//   return <p>Ohai</p>;
// }

const preventDefault = (f) => (e) => { e.preventDefault(); f() };

const FB = React.createClass({
  render() {
    const {env, options, payload, isEditing} = this.props;
    if (isEditing) {
      return (
        <form onSubmit={preventDefault(() => env.save({ name: this.refs.name.value }))}>
          <input type="text" ref="name" defaultValue={payload.name}></input>
          <button>Save</button>
          <button onClick={preventDefault(env.cancel)}>Cancel</button>
        </form>
      );
    } else {
      return <button onClick={env.edit}>Hello {payload.name}</button>;
    }
  }
});

const FBCard = componentToCard('FBCard', FB);

const doc = {
  version: "0.3.0",
  markups: [],
  atoms: [],
  cards: [],
  sections: [
    [1, "p", [
      [0, [], 0, "Welcome to Mobiledoc"]
    ]]
  ]
};

const willCreateEditor = () => { console.log('creating editor...'); };
const didCreateEditor = (e) => { console.log('created editor:', e); };
const onChange = (doc) => { console.log(doc); };

const CardButton = ({editor}) => {
  return <button onClick={() => editor.insertCard('FBCard', {name: 'World'}, true)}>FB</button>;
};

ReactDOM.render(<ReactMobiledoc.Container mobiledoc={doc}
                                          willCreateEditor={willCreateEditor}
                                          didCreateEditor={didCreateEditor}
                                          onChange={onChange}
                                          options={{cards: [FBCard]}}>
                  <ReactMobiledoc.Toolbar />
                  <CardButton />
                  <ReactMobiledoc.Editor />
                  <ReactMobiledoc.LinkForm />
                </ReactMobiledoc.Container>,
                document.getElementById('root'));
