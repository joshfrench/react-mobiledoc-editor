import React from 'react';
import MobileDoc from 'mobiledoc-kit';

const LinkControl = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    editor: React.PropTypes.instanceOf(MobileDoc.Editor).isRequired
  },
  contextTypes: {
    setLinkOffsets: React.PropTypes.func
  },
  render() {
    return React.cloneElement(this.props.children, {onClick: this.handleClick});
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
  }
});

export default LinkControl;
