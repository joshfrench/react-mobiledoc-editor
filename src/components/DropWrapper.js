import React from 'react';
import Mobiledoc from 'mobiledoc-kit';

const DropWrapper = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    onDrop: React.PropTypes.func
  },
  contextTypes: {
    editor: React.PropTypes.object
  },
  render() {
    return React.cloneElement(this.props.children, { onDrop: this.handleDrop });
  },
  handleDrop(e) {
    const { editor } = this.context;
    const { clientX, clientY } = e;
    const { section, offset } = editor.positionAtPoint(clientX, clientY);
    if (typeof section !== 'undefined') {
      const range = Mobiledoc.default.Range.create(section, offset); // TODO: figure out why this isn't exported directly on Mobiledoc obj?
      editor.selectRange(range);
    }
    if (typeof this.props.onDrop === 'function') {
      this.props.onDrop(e, editor);
    }
  }
});

export default DropWrapper;
