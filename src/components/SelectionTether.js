import React from 'react';

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

export default SelectionTether;
