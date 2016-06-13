import React from 'react';
import ReactDOM from 'react-dom';

import * as ReactMobiledoc from '../src';
import HelloCard from './HelloCard';
import ImageCard from './ImageCard';
console.log(ImageCard);
const doc = {
  version: "0.3.0",
  markups: [],
  atoms: [],
  cards: [],
  sections: [
    [1, "h1", [
      [0, [], 0, "Welcome to Mobiledoc"]
    ]],
    [1, "p", [
      [0, [], 0, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare sit amet velit sit amet posuere. Etiam quis urna in justo elementum suscipit eget quis eros. Curabitur in blandit ligula. Sed ac nunc rhoncus, lobortis ex at, varius nulla."]
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
  return <button onClick={() => editor.insertCard('ImageCard', {src: 'http://placekitten.com/200/200'}, true)}>Image</button>;
};

ReactDOM.render(<ReactMobiledoc.Container mobiledoc={doc}
                                          cards={[ImageCard]}
                                          willCreateEditor={willCreateEditor}
                                          didCreateEditor={didCreateEditor}
                                          onChange={onChange}>
                  <ReactMobiledoc.Toolbar />
                  <ImageButton />
                  <ReactMobiledoc.Editor />
                  <ReactMobiledoc.LinkForm />
                </ReactMobiledoc.Container>,
                document.getElementById('root'));
