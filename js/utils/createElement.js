export const createEl = (element, props = {}) => {
  const el = document.createElement(element);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'dataset') Object.assign(el.dataset, value);
    else el[key] = value;
  }
  return el;
};
