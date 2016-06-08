import React from 'react';
import MobileDoc from 'mobiledoc-kit';

const SectionControl = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    tag: React.PropTypes.string.isRequired,
    editor: React.PropTypes.instanceOf(MobileDoc.Editor).isRequired
  },
  handleClick() {
    this.props.editor.toggleSection(this.props.tag);
  },
  render() {
    return React.cloneElement(this.props.children, {onClick: this.handleClick});
  }
});

export default SectionControl;
