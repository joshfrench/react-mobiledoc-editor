import React from 'react';
import ReactDOM from 'react-dom';

import * as ReactMobiledoc from '../src';
import ImageCard from './ImageCard';
import {MentionAtom, expandMention} from './MentionAtom';

const ImageButton = (props, {editor}) => {
  return <button onClick={() => editor.insertCard('ImageCard', {src: 'http://placekitten.com/200/200', caption: "Hi, I'm a kitten"}, false)}>Image</button>;
};

ImageButton.contextTypes = {
  editor: React.PropTypes.object
};

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
const didCreateEditor = (e) => e.onTextInput(expandMention);
const onChange = (doc) => { console.log(doc); };

ReactDOM.render(<ReactMobiledoc.Container mobiledoc={doc}
                                          atoms={[MentionAtom]}
                                          cards={[ImageCard]}
                                          willCreateEditor={willCreateEditor}
                                          didCreateEditor={didCreateEditor}
                                          onChange={onChange}>
                  <ReactMobiledoc.Toolbar>
                    <ReactMobiledoc.CardControl card={ImageCard} edit={false} payload={{caption: "Edit this right meow!", src: "http://www.placekitten.com/200/200"}} />
                  </ReactMobiledoc.Toolbar>
                  <ReactMobiledoc.Editor />
                  <ReactMobiledoc.LinkForm />
                </ReactMobiledoc.Container>,
                document.getElementById('root'));
