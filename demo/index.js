import React from 'react';
import ReactDOM from 'react-dom';

import * as ReactMobiledoc from '../src';

const FB = ({name}) => <button onClick={() => console.log(`ohai ${name}`)}>Ohai {name}</button>;

const FBCard = {
  name: 'fb-card',
  type: 'dom',
  render: ({env, payload}) => {
    const fb = React.createElement(FB, payload);
    const div = document.createElement(div);
    ReactDOM.render(fb, div);
    return div.firstChild;
  }
};

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
  return <button onClick={() => editor.insertCard('fb-card', {name: 'Josh'})}>FB</button>;
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
