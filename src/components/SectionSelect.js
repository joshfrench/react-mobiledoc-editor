import PropTypes from 'prop-types';
import React from 'react';

const SectionSelect = ({ tags = [], ...props }, { editor, activeSectionTags = []}) => {
  const activeTag = () => tags.find((t) => activeSectionTags.includes(t));

  const onChange = (event) => {
    const tag = event.target.value || activeTag();
    editor.toggleSection(tag);
  };

  return (
    <select value={activeTag() || ""} onChange={onChange} {...props}>
      <option value=""></option>
      { tags.map((t) => <option value={t} key={t}>{t.toUpperCase()}</option>) }
    </select>
  );
};

SectionSelect.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.oneOf(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'aside'])).isRequired
};

SectionSelect.contextTypes = {
  editor: PropTypes.object,
  activeSectionTags: PropTypes.array
};

export default SectionSelect;
