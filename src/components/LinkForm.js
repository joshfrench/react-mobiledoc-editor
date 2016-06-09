import React from 'react';
import MobileDoc from 'mobiledoc-kit';
import SelectionTether from './SelectionTether';

const preventDefault = (f) => {
  return (e) => {
    e.preventDefault();
    f();
  };
};

const LinkForm = React.createClass({
  propTypes: {
    editor: React.PropTypes.instanceOf(MobileDoc.Editor).isRequired
  },
  contextTypes: {
    linkOffsets: React.PropTypes.object,
    setLinkOffsets: React.PropTypes.func
  },
  render() {
    if (!this.context.linkOffsets) {
      return null;
    }

    return (
      <SelectionTether>
        <form onSubmit={preventDefault(this.handleSubmit)}>
          <input type="text" ref="url"></input>
          <button>Link</button>
          <button onClick={preventDefault(this.closeForm)}>Cancel</button>
        </form>
      </SelectionTether>
    );
  },
  closeForm() {
    this.context.setLinkOffsets(null);
  },
  addLink(data) {
    const {href} = data;
    this.props.editor.run(postEditor => {
      const markup = postEditor.builder.createMarkup('a', {href});
      postEditor.addMarkupToRange(this.context.linkOffsets, markup);
    });
  },
  handleSubmit() {
    this.closeForm();
    this.addLink({href: this.refs.url.value});
  }
});

export default LinkForm;
