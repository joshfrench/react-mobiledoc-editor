import React from 'react';
import ReactDOM from 'react-dom';

import * as ReactMobiledoc from '../src';
import HelloCard from './HelloCard';
import ImageCard from './ImageCard';

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
  return <button onClick={() => editor.insertCard('HelloCard', {name: 'World'}, true)}>Hello</button>;
};

const ImageButton = ({editor}) => {
  return <button onClick={() => editor.insertCard('ImageCard', {src: 'http://placekitten.com/200/100'}, true)}>Image</button>;
};

ReactDOM.render(<ReactMobiledoc.Container mobiledoc={doc}
                                          willCreateEditor={willCreateEditor}
                                          didCreateEditor={didCreateEditor}
                                          onChange={onChange}
                                          options={{cards: [ImageCard]}}>
                  <ReactMobiledoc.Toolbar />
                  <ImageButton />
                  <ReactMobiledoc.Editor />
                  <ReactMobiledoc.LinkForm />
                </ReactMobiledoc.Container>,
                document.getElementById('root'));
