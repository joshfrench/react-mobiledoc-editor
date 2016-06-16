import React from 'react';
import classNames from 'classnames';
import titleCase from '../utils/titleCase';

const MarkupControl = ({tag='', children=<button>{titleCase(tag)}</button>, ...props}, {editor, activeMarkupTags=[]}) => {
  const onClick = () => editor.toggleMarkup(tag);
  const className = classNames(children.props.className, {
    active: activeMarkupTags.indexOf(tag.toLowerCase()) > -1
  });
  return React.cloneElement(children, {...props, onClick, className});
};

MarkupControl.contextTypes = {
  editor: React.PropTypes.object,
  activeMarkupTags: React.PropTypes.array
};

export default MarkupControl;
