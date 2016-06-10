import React from 'react';
import ReactDOM from 'react-dom';
import Mobiledoc from 'mobiledoc-kit';

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

const editor = new Mobiledoc.Editor({ mobiledoc: doc });

ReactDOM.render(<ReactMobiledoc.Container editor={editor}>
                  <ReactMobiledoc.Toolbar editor={editor} />
                  <ReactMobiledoc.Editor editor={editor} />
                  <ReactMobiledoc.LinkForm />
                </ReactMobiledoc.Container>,
                document.getElementById('root'));
