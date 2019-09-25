import PropTypes from 'prop-types';
import React from 'react';

const AttributeSelect = (
  { values = [], defaultValue = values[0], attribute,  ...props },
  { editor, activeSectionAttributes = [] }
) => {
  console.log({ activeSectionAttributes });
  const activeSectionAlignments = activeSectionAttributes.map(
    a => a[`data-md-${attribute}`] || defaultValue
  );

  let activeAlignment = activeSectionAlignments[0];

  for (let i = 1; i < activeSectionAlignments.length; i++) {
    if (activeAlignment !== activeSectionAlignments[i]) {
      activeAlignment = '';
      break;
    }
  }

  const onChange = event => {
    editor.setAttribute(attribute, event.target.value);
  };

  console.log({ activeAlignment });
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
