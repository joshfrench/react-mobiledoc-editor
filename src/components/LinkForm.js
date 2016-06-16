import React from 'react';
import SelectionTether from './SelectionTether';

const preventDefault = (f) => {
  return (e) => {
    e && e.preventDefault && e.preventDefault();
    f();
  };
};

// TODO: Figure out how to make stateless? Currently needs `ref` to input
// so can't be stateless.
const LinkForm = React.createClass({
  contextTypes: {
    linkOffsets: React.PropTypes.object,
    setLinkOffsets: React.PropTypes.func,
    addLink: React.PropTypes.func
  },
  render() {
    if (!this.context.linkOffsets) {
      return null;
    }

    const props = { ...this.props, onSubmit: preventDefault(this.handleSubmit) };
    return (
      <SelectionTether>
        <form {...props}>
          <input type="text" ref="url"></input>
          <button ref="add">Link</button>
          <button ref="cancel" onClick={preventDefault(this.closeForm)}>Cancel</button>
        </form>
      </SelectionTether>
    );
  },
  closeForm() {
    this.context.setLinkOffsets(null);
  },
  handleSubmit() {
    this.closeForm();
    this.context.addLink({href: this.refs.url.value});
  }
});

export default LinkForm;
