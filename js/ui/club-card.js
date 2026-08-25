import { createImg } from '../index.js';

function ClubCard({
  logo = 'https://cdn.jsdelivr.net/gh/h6mzy/foob@main/demo/svg/DKH.svg',
  name = 'Club name',
  fluidHeight = false
} = {}) {
  
  const article = document.createElement('article');
  article.className = 'foob-club-article';

  const card = createElement('div');
  card.className = 'foob-club-card';

  if (fluidHeight) {
    card.classList.add('fluid-ht');
  }

  const logoEl = createImg(logo, name, 'foob-club-card-logo');

  card.append(logoEl);
  article.append(card);
  
  return article;
};

export default ClubCard;