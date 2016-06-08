import React from 'react';
import MobileDoc from 'mobiledoc-kit';

const LinkControl = React.createClass({
  contextTypes: {
    setLinkOffsets: React.PropTypes.func
  },
  propTypes: {
    children: React.PropTypes.element.isRequired,
    editor: React.PropTypes.instanceOf(MobileDoc.Editor).isRequired,
  },
  handleClick() {
    const {editor} = this.props;
    if (!editor.hasCursor()) {
      return;
    }

    if (editor.hasActiveMarkup('a')) {
      editor.toggleMarkup('a');
    } else {
      this.context.setLinkOffsets(editor.range);
    }
  },
  render() {
    return React.cloneElement(this.props.children, {onClick: this.handleClick});
  }
});

export default LinkControl;
