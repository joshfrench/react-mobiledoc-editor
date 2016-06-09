import React from 'react';
import ReactDOM from 'react-dom';

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
  getInitialState() {
    return {};
  },
  componentWillMount() {
    const selection = window.getSelection();
    const range = selection && selection.rangeCount && selection.getRangeAt(0);

    // TODO: warn if selection/range doesn't exist here?

    if (range) {
      const rect = range.getBoundingClientRect();
      this.setState({ left: rect.left, top: rect.top });
    }
  },
  componentDidMount: function() {
    const node = ReactDOM.findDOMNode(this);

    const height = node.getBoundingClientRect().height,
          top    = this.state.top - this.props.paddingTop - height,
          left   = this.state.left - this.props.paddingLeft;

    node.style.left = `${left}px`;
    node.style.top  = `${top}px`;
  },
  render() {
    return React.cloneElement(this.props.children, {style: {position: 'fixed'}});
  }
});

export default SelectionTether;
