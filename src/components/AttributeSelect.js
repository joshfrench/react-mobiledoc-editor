import PropTypes from 'prop-types';
import React from 'react';
import titleCase from '../utils/titleCase';
import getActiveAttribute from '../utils/getActiveAttribute';
import { ReactMobileDocContext } from "./Context";

const AttributeSelect = (
  { values = [], defaultValue = values[0], attribute,  ...props },
) => {
  return (
    <ReactMobileDocContext.Consumer>
      {({ editor, activeSectionAttributes = []}) => {
        const activeAttribute = getActiveAttribute(activeSectionAttributes, attribute, defaultValue);

        const onChange = event => {
          const { value } = event.target;
          if (value === defaultValue) {
            editor.removeAttribute(attribute);
          } else {
            editor.setAttribute(attribute, value);
          }
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
      }}
    </ReactMobileDocContext.Consumer>
  );
};

AttributeSelect.propTypes = {
  attribute: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AttributeSelect;
