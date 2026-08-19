import { createElement, createImg } from '../index.js'; 

function PlayerCard({
  name = 'Player name',
  image = '',
  position = 'Midfield',
  number = '7',
  logo = '',
  club = 'Club name',
  captain = false,
  label = null,
  fluidHeight = false
} = {}) {
  const article = createElement('article', { className: 'foob-player-article' });
  const card = createElement('div', { className: 'foob-player-card' });
  
  if (fluidHeight) card.classList.add('fluid-ht');
  
  const img = createImg(image, name, 'foob-player-card-img');
  const clubEl = createElement('div', { className: 'foob-player-card-club' });
  const numberEl = createElement('div', { className: 'foob-player-card-number', textContent: number });
  
  clubEl.append(numberEl, img);
  
  if (logo) {
    const logoEl = createImg(logo, club, 'foob-player-club-logo');
    clubEl.append(logoEl);
  }
  
  const info = createElement('div', { className: 'foob-player-card-info' });
  const nameEl = createElement('div', { className: 'foob-player-card-name', textContent: name });
  const positionEl = createElement('div', { className: 'foob-player-card-position', textContent: position });

  info.append(nameEl, positionEl);
  card.append(clubEl, info);
  
  if (captain) {
    const captainEl = createElement('div', { className: 'foob-player-card-label captain', textContent: 'captain' });
    card.append(captainEl);
  }
  
  if (label) {
    const labelEl = createElement('div', { className: 'foob-player-card-label', textContent: label });
    labelEl.classList.add(label);
    card.append(labelEl);
  }
  
  article.append(card);

  return article;
}

export default PlayerCard;
