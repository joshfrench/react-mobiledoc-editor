import React from 'react';
import { classToDOMAtom } from '../src';

/**
 * Component-based atoms are rendered with these props:
 *
 * - `value`: The textual representation to for this atom.
 * - `payload`: The payload for this atom. Please note the payload object is
 *    disconnected from the atom's representation in the serialized mobiledoc; to
 *    update the payload as it exists in the mobiledoc, use the `save` callback.
 * - `save`: A callback which accepts a new payload for the card, then saves that
 *    value and payload to the underlying mobiledoc.
 * - `name`: The name of this card.
 * - `onTeardown`: A callback that can be called when the rendered content is torn down.
 */

class Counter extends React.Component {
  handleClick = () => {
    const { payload, save, value } = this.props;
    const clicks = (payload.clicks || 0) + 1;
    save(value, { ...payload, clicks }); // updates payload.clicks, rerenders button
  }

  render() {
    const { payload } = this.props;

    return (
      <button onClick={this.handleClick}>
        Clicks: {payload.clicks || 0}
      </button>
    );
  }
}

Counter.displayName = 'Counter'

const ClickCounterAtom = classToDOMAtom(Counter);

export default ClickCounterAtom;