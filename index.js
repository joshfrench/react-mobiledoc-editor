import MobileDoc from 'mobiledoc-kit';
import React from 'react';
import ReactDOM from 'react-dom';

const doc = {
  version: "0.3.0",
  markups: [],
  atoms: [],
  cards: [],
  sections: [
    [1, "p", [
      [0, [], 0, "Welcome to Mobiledoc"]
    ]]
  ]
};

const SelectionTether = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
  getDefaultProps() {
    return {
      paddingLeft: 0,
      paddingTop: 10
    };
  },
  componentWillMount() {
    const selection = window.getSelection();
    const range = selection && selection.rangeCount && selection.getRangeAt(0);

    // warn if selection/range doesn't exist here?

    if (range) {
      const rect = range.getBoundingClientRect();
      this.setState({ left: rect.left, top: rect.top });
    }
  },
  componentDidMount: function() {
    const {child} = this.refs;

    const height = child.getBoundingClientRect().height,
          top    = this.state.top - this.props.paddingTop - height,
          left   = this.state.left - this.props.paddingLeft;

    child.style.left = `${left}px`;
    child.style.top  = `${top}px`;
  },
  render() {
    return React.cloneElement(this.props.children, {ref: 'child', style: {position: 'fixed'}});
  }
});

const preventDefault = (f) => {
  return (e) => {
    e.preventDefault();
    f();
  }
};

const LinkForm = React.createClass({
  propTypes: {
    addLink: React.PropTypes.func.isRequired,
    closeForm: React.PropTypes.func.isRequired,
    offsets: React.PropTypes.object
  },
  handleSubmit() {
    this.props.closeForm();
    this.props.addLink({href: this.refs.url.value});
  },
  render() {
    if (!this.props.offsets) {
      return null;
    }

    return (
      <SelectionTether>
        <form onSubmit={preventDefault(this.handleSubmit)}>
          <input type="text" ref="url"></input>
          <button>Link</button>
          <button onClick={preventDefault(this.props.closeForm)}>Cancel</button>
        </form>
      </SelectionTether>
    );
  }
});

const MarkupControl = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    tag: React.PropTypes.string.isRequired,
    editor: React.PropTypes.instanceOf(MobileDoc.Editor).isRequired
  },
  handleClick() {
    this.props.editor.toggleMarkup(this.props.tag);
  },
  render() {
    return React.cloneElement(this.props.children, {onClick: this.handleClick});
  }
});

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

const LinkControl = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    editor: React.PropTypes.instanceOf(MobileDoc.Editor).isRequired,
    setOffsets: React.PropTypes.func.isRequired
  },
  handleClick() {
    const {editor, setOffsets} = this.props;
    if (!editor.hasCursor()) {
      return;
    }

    if (editor.hasActiveMarkup('a')) {
      editor.toggleMarkup('a');
    } else {
      setOffsets();
    }
  },
  render() {
    return React.cloneElement(this.props.children, {onClick: this.handleClick});
  }
});

const Editor = React.createClass({
  getInitialState() {
    return {};
  },
  componentWillMount() {
    this.editor = new MobileDoc.Editor({ mobiledoc: this.props.doc });
  },
  componentDidMount() {
    this.editor.render(this.refs.editor);
  },
  setLinkOffsets() {
    this.setState({linkOffsets: this.editor.range});
  },
  clearLinkOffsets() {
    this.setState({linkOffsets: null});
  },
  addLink(data) {
    const {href} = data;

    this.editor.run(postEditor => {
      const markup = postEditor.builder.createMarkup('a', {href});
      postEditor.addMarkupToRange(this.state.linkOffsets, markup);
    });
  },
  render() {
    return (
      <div>
        <ul>
          <li><MarkupControl editor={this.editor} tag='strong'><button>B</button></MarkupControl></li>
          <li><SectionControl editor={this.editor} tag='h1'><button>H1</button></SectionControl></li>
          <li><LinkControl editor={this.editor} setOffsets={this.setLinkOffsets}><button>A</button></LinkControl></li>
        </ul>
        <div ref="editor" />
        <LinkForm offsets={this.state.linkOffsets} addLink={this.addLink} closeForm={this.clearLinkOffsets} />
      </div>
    )
  }
});

ReactDOM.render(<Editor doc={doc} />, document.getElementById('root'));
