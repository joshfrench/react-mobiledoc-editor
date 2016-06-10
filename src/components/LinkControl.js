import React from 'react';

const LinkControl = ({editor, children=<button>Link</button>}, {setLinkOffsets}) => {
  const onClick = () => {
    if (!editor.hasCursor()) {
      return;
    }

    if(editor.hasActiveMarkup('a')) {
      editor.toggleMarkup('a');
    } else {
      setLinkOffsets(editor.range);
    }
  };

  return React.cloneElement(children, {onClick});
};

LinkControl.contextTypes = {
  setLinkOffsets: React.PropTypes.func
};

export default LinkControl;
