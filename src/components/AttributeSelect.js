import PropTypes from 'prop-types';
import React from 'react';
import titleCase from '../utils/titleCase';
import getActiveAttribute from '../utils/getActiveAttribute';

const AttributeSelect = (
  { values = [], defaultValue = values[0], attribute,  ...props },
  { editor, activeSectionAttributes = []}
) => {
  const activeAttribute = getActiveAttribute(activeSectionAttributes, attribute, defaultValue);

  const onChange = event => {
    editor.setAttribute(attribute, event.target.value);
  };

  return (
    <select value={activeAttribute} onChange={onChange} {...props}>
      {activeAttribute === '' && (
        <option value={''} key={''}>
          —
        </option>
      )}
      {values.map(v => (
        <option value={v} key={v}>
          {titleCase(v)}
        </option>
      ))}
    </select>
  );
};

AttributeSelect.propTypes = {
  attribute: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired
};

AttributeSelect.contextTypes = {
  editor: PropTypes.object,
  activeSectionAttributes: PropTypes.array
};

export default AttributeSelect;
