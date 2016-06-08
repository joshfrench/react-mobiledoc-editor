import React from 'react';
import ReactDOM from 'react-dom';

import * as ReactMobiledoc from '../src';

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


ReactDOM.render(<ReactMobiledoc.Editor doc={doc} />, document.getElementById('root'));
