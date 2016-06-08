import MobileDoc from 'mobiledoc-kit';
import React from 'react';
import ReactDOM from 'react-dom';

import Editor from './src/components/Editor';

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


ReactDOM.render(<Editor doc={doc} />, document.getElementById('root'));
