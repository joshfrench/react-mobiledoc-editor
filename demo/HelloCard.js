import React from 'react';
import {componentToDOMCard} from '../src';

const preventDefault = (f) => (e) => { e.preventDefault(); f() };

const Hello = React.createClass({
  render() {
    const {env, options, payload, isEditing} = this.props;
    if (isEditing) {
      return (
        <form onSubmit={preventDefault(() => env.save({ name: this.refs.name.value }))}>
          <input type="text" ref="name" defaultValue={payload.name}></input>
          <button>Save</button>
          <button onClick={preventDefault(env.cancel)}>Cancel</button>
        </form>
      );
    } else {
      return <button onClick={env.edit}>Hello {payload.name}</button>;
    }
  }
});

const HelloCard = componentToDOMCard('HelloCard', Hello);

export default HelloCard;
