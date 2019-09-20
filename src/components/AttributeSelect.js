import PropTypes from 'prop-types';
import React from 'react';

const AttributeSelect = (
  { values = [], ...props },
  { editor, activeSectionAttributes = [] }
) => {
  const activeSectionAlignments = activeSectionAttributes.map(
    a => a['data-md-text-align'] || 'left'
  );
  let activeAlignment = activeSectionAlignments[0];

  for (let i = 1; i < activeSectionAlignments.length; i++) {
    if (activeAlignment !== activeSectionAlignments[i]) {
      activeAlignment = '';
      break;
    }
  }

  const onChange = event => {
    editor.setAttribute('text-align', event.target.value);
  };

  return (
    <select value={activeAlignment} onChange={onChange} {...props}>
      {activeAlignment === '' && (
        <option value={''} key={''}>
          —
        </option>
      )}
      {values.map(v => (
        <option value={v} key={v}>
          {v.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

AttributeSelect.contextTypes = {
  editor: PropTypes.object,
  activeSectionAttributes: PropTypes.array
};

export default AttributeSelect;
