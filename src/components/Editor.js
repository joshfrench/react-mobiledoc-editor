import React from 'react';
import { ReactMobileDocContext } from './Context';

class Editor extends React.Component {
  componentDidMount() {
    this.renderMobiledocEditor();
  }

  componentDidUpdate(previousProps) {
    const { editor } = this.props.context;
    const { editor: previousEditor } = previousProps.context;

    if (editor !== previousEditor) {
      this.renderMobiledocEditor();
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { context: _, ...props } = this.props;

    return <div {...props} ref={(r) => (this.editorEl = r)} />;
  }

  renderMobiledocEditor = () => {
    const { editor } = this.props.context;
    if (editor) {
      editor.render(this.editorEl);
    }
  };
}

const EditorOuter = React.forwardRef(function EditorOuter(props, ref) {
  return (
    <ReactMobileDocContext.Consumer>
      {(context) => <Editor {...props} context={context} ref={ref} />}
    </ReactMobileDocContext.Consumer>
  );
});

export default EditorOuter;
