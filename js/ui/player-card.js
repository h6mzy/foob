import { createImg } from '../index.js';

function PlayerCard({
  name = 'Player name',
  image = 'https://cdn.jsdelivr.net/gh/h6mzy/foob@0.5.18/demo/img/0.webp',
  position = 'Midfield',
  number = '7',
  logo = 'https://cdn.jsdelivr.net/gh/h6mzy/foob@0.5.18/demo/svg/DKH.svg',
  club = 'Club name',
  captain = false,
  label = null,
  fluidHeight = false
} = {}) {

  const article = document.createElement('article');
  article.className = 'foob-player-article';

  const card = document.createElement('div');
  card.className = 'foob-player-card';

  if (fluidHeight) {
    card.classList.add('fluid-ht');
  }

  const img = createImg(image, name, 'foob-player-card-img');

  const clubEl = document.createElement('div');
  clubEl.className = 'foob-player-card-club';

  const numberEl = document.createElement('div');
  numberEl.className = 'foob-player-card-number';
  numberEl.textContent = number;

  clubEl.append(numberEl, img);

  if (logo) {
    const logoEl = createImg(logo, club, 'foob-player-card-logo');

    clubEl.append(logoEl);
  }

  const info = document.createElement('div');
  info.className = 'foob-player-card-info';

  const nameEl = document.createElement('div');
  nameEl.className = 'foob-player-card-name';
  nameEl.textContent = name;

  const positionEl = document.createElement('div');
  positionEl.className = 'foob-player-card-position';
  positionEl.textContent = position;

  info.append(nameEl, positionEl);

  card.append(clubEl, info);

  if (captain) {
    const captainEl = document.createElement('div');
    captainEl.className = 'foob-player-card-label captain';
    captainEl.textContent = 'captain';

    card.append(captainEl);
  }

  if (label) {
    const labelEl = document.createElement('div');
    labelEl.className = 'foob-player-card-label';
    labelEl.textContent = label;

    labelEl.classList.add(label);

    card.append(labelEl);
  }

  article.append(card);

  return article;
}

export default PlayerCard;
