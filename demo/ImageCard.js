import React from 'react';
import {classToDOMCard} from '../src';

/**
 * Component-based cards are rendered with these props:
 *
 * - `payload` The payload for this card. Note: the payload object is
 *    disconnected from the card's payload in the serialized mobiledoc.
 *    To update the mobiledoc payload, use the `saveCard` callback.
 * - `editCard` A callback for toggling this card into edit mode (no-op
 *    if the card is already in edit mode).
 * - `removeCard` A callback for removing this card.
 * - `saveCard` A callback accepting new payload for the card, then
 *    saving that payload and toggling this card into display mode.
 *    Can optionally be passed an extra `false` argument to avoid
 *    toggling to display mode.
 * - `cancelCard` A callback for toggling this card to display mode
 *    without saving (a no-op if the card is already in display mode).
 * - `cardName` The name of this card.
 * - `editor` A reference to the mobiledoc-kit editor instance.
 * - `postModel` A reference to this card's model in the editor's
 *    abstract tree. This may be necessary to do programmatic editing.
 * - `isEditing` A bool indicating if the card is in Edit mode or not.
 * - `isInEditor` A bool indicating if the card is displayed inside an
 *    editor interface or not.
 */
const Image = React.createClass({
  render() {
    const {isInEditor, payload, saveCard, editCard, isEditing} = this.props;
    if (isEditing) {
      return (
        <div>
          <input type="text" ref="src" defaultValue={payload.src} /><br />
          <input type="text" ref="caption" defaultValue={payload.caption} /><br/>
          <button onClick={() => saveCard({ src: this.refs.src.value, caption: this.refs.caption.value })}>Save</button>
        </div>
      );
    } else {
      const onClick = isInEditor ? editCard : null;
      return (
        <div>
          <img src={payload.src} onClick={onClick} /><br/>
          <small>{payload.caption}</small><br/>
          {isInEditor && <button onClick={onClick}>Edit</button>}
        </div>
      );
    }
  }
});

const ImageCard = classToDOMCard(Image);

export default ImageCard;
