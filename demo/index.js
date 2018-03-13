import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as ReactMobiledoc from '../src';
import ImageCard from './ImageCard';

const mobiledoc = {
  version: "0.3.0",
  markups: [],
  atoms: [],
  cards: [],
  sections: [
  ]
};

const willCreateEditor = () => { console.log('creating editor...'); };
const didCreateEditor = (e) => { console.log('created editor:', e); };
const onChange = (doc) => { console.log(doc); };

const config = {
  mobiledoc,
  cards: [ImageCard],
  placeholder: "Welcome to Mobiledoc!",
  willCreateEditor,
  didCreateEditor,
  onChange
};

const imgPayload = { caption: "Edit this right meow!", src: "http://www.placekitten.com/200/200" };

const ImageButton = ({ isEditing = true }, { editor }) => {
  const onClick = () => editor.insertCard('ImageCard', imgPayload, isEditing);
  return <button onClick={onClick}>Image</button>;
};

ImageButton.contextTypes = {
  editor: PropTypes.object
};

ReactDOM.render(<ReactMobiledoc.Container {...config}>
                  <ReactMobiledoc.Toolbar />
                  <ImageButton />
                  <ReactMobiledoc.Editor />
                </ReactMobiledoc.Container>,
                document.getElementById('root'));

require("!style-loader!css-loader!../node_modules/mobiledoc-kit/dist/css/mobiledoc-kit.css");
