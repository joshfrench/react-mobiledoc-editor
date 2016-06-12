import React from 'react';
import classNames from 'classnames';
import titleCase from '../utils/titleCase';

const MarkupControl = ({editor, tag='', children=<button>{titleCase(tag)}</button>}, {activeMarkupTags=[]}) => {
  const onClick = () => editor.toggleMarkup(tag);
  const className = classNames(children.props.className, {
    active: activeMarkupTags.indexOf(tag.toLowerCase()) > -1
  });
  return React.cloneElement(children, {onClick, className});
};

MarkupControl.contextTypes = {
  activeMarkupTags: React.PropTypes.array
};

export default MarkupControl;
