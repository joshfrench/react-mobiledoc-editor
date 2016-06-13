import React from 'react';
import {classToDOMCard} from '../src';

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
