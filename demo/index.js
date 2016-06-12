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

// const editor = new Mobiledoc.Editor({ mobiledoc: doc });
// editor.inputModeDidChange(() => { console.log(editor.activeMarkups, editor.activeSections); });
const willCreateEditor = () => { console.log('create editor'); };
const didCreateEditor = (e) => { console.log('created', e); };

ReactDOM.render(<ReactMobiledoc.Container mobiledoc={doc} willCreateEditor={willCreateEditor} didCreateEditor={didCreateEditor} >
                  <ReactMobiledoc.Toolbar />
                  <ReactMobiledoc.Editor />
                  <ReactMobiledoc.LinkForm />
                </ReactMobiledoc.Container>,
                document.getElementById('root'));
