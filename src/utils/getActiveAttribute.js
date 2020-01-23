export default (activeSectionAttributes, attribute, defaultValue) => {
  const attributes = activeSectionAttributes.map(
    a => a[`data-md-${attribute}`] || defaultValue
  );

  let activeAttribute = attributes[0];

  for (let i = 1; i < attributes.length; i++) {
    if (activeAttribute !== attributes[i]) {
      activeAttribute = '';
      break;
    }
  }

  return activeAttribute;
};
