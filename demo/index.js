import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as ReactMobiledoc from '../src';
import ImageCard from './ImageCard';
import ClickCounterAtom from './ClickCounterAtom';


const config = {
  cards: [ImageCard],
  atoms: [ClickCounterAtom],
  placeholder: "Welcome to Mobiledoc!",
  willCreateEditor:() => { console.log('creating editor...'); },
  didCreateEditor:(e) => { console.log('created editor:', e); },
  onChange:(doc) => { console.log(doc); }
};

const imgPayload = { caption: "Edit this right meow!", src: "http://www.placekitten.com/200/200" };


const ImageButton = (props, context) => {
  const { isEditing } = props;
  const { editor } = context;

  const onClick = () => editor.insertCard('ImageCard', imgPayload, isEditing);
  return <button onClick={onClick}>Image Card</button>;
};

ImageButton.contextTypes = {
  editor: PropTypes.object
};


const ClickCounterButton = (props, context) => {
  const { editor } = context;
  const onClick = () => editor.insertAtom('Counter', '', { clicks: 0 });
  return <button onClick={onClick}>Click Counter Atom</button>;
};

ClickCounterButton.contextTypes = {
  editor: PropTypes.object
};



ReactDOM.render(<ReactMobiledoc.Container {...config}>
                  <ReactMobiledoc.Toolbar />
                  <ImageButton />
                  <ClickCounterButton />
                  <ReactMobiledoc.Editor />
                </ReactMobiledoc.Container>,
                document.getElementById('root'));

require("!style-loader!css-loader!../node_modules/mobiledoc-kit/dist/mobiledoc.css");
