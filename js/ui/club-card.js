import { createElement, createImg } from '../index.js'; 

function ClubCard({
  id = 'RDM',
  logo = 'https://cdn.jsdelivr.net/gh/h6mzy/foob@main/demo/svg/DKH.svg',
  fluidHeight = false
} = {}) {
  const article = createElement('article', { className: 'foob-club-article' });
  const card = createElement('div', { className: 'foob-club-card' });
  if (fluidHeight) card.classList.add('fluid-ht');
  const logoEl = createImg(logo, name, 'foob-club-card-logo');
  card.append(logoEl);
  article.append(card);
  return article;
};

export default ClubCard;
