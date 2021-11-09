import React from 'react';
import { ReactMobileDocContext } from "./Context";

class Editor extends React.Component {
  componentDidMount() {
    const { editor } = this.props.context;
    if (editor) {
      editor.render(this.editorEl);
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { context: _, ...props } = this.props;

    return <div {...props} ref={r => (this.editorEl = r)} />;
  }
}

const EditorOuter = React.forwardRef(function EditorOuter(props, ref) {
  return <ReactMobileDocContext.Consumer>
    {(context) => <Editor {...props} context={context} ref={ref} />}
  </ReactMobileDocContext.Consumer>;
});

export default EditorOuter;
