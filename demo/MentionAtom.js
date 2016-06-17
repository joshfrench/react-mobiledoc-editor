import React from 'react';
import {classToDOMAtom} from '../src/utils/classToAtom';

export const expandMention = {
  // match: /@(\w+) $/, // note trailing space and $ anchor
  text: "@josh$",
  run(editor, matches) {
    // const name = matches[1];
    const range = editor.range;
    editor.selectRange(range.extend(-5)); // select mention including @ but omitting trailing space
    editor.insertAtom('Mention', 'josh');
    // editor.selectRange(range);
  }
};

const Mention = (props) => {
  console.log(props);
  return <span style={{color: "blue"}}>@{props.value}</span>;
};

export const MentionAtom = classToDOMAtom(Mention, 'Mention');
