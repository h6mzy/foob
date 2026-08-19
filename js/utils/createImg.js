import { createElement } from './createElement.js';

export const createImg = (src, alt, className = 'foob-img') => {
  const wrap = createElement('article', { className });
  const img = createElement('img', { src, alt });
  wrap.append(img);
  return wrap;
};
