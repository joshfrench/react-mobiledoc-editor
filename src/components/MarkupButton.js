import React from 'react';
import classNames from 'classnames';
import titleCase from '../utils/titleCase';

const MarkupButton = ({ tag = '', children, className, ...props }, { editor, activeMarkupTags = []}) => {
  const onClick = () => editor.toggleMarkup(tag);
  className = classNames(className, {
    active: activeMarkupTags.indexOf(tag.toLowerCase()) > -1
  });
  const buttonProps = { ...props, onClick, className };
  children = children || titleCase(tag);
  return <button { ...buttonProps }>{children}</button>;
};

MarkupButton.propTypes = {
  tag: React.PropTypes.string.isRequired,
  children: React.PropTypes.node
};

MarkupButton.contextTypes = {
  editor: React.PropTypes.object,
  activeMarkupTags: React.PropTypes.array
};

export default MarkupButton;
