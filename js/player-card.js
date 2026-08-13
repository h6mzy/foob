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
  const article = document.createElement('article');
  article.className = 'foob-player-article';

  const card = document.createElement('div');
  card.className = 'foob-player-card';
  
  if (fluidHeight) {
    card.classList.add('fluid-ht');
  }

  // Player image
  const imageWrap = document.createElement('div');
  imageWrap.className = 'foob-player-card-image';

  const playerImage = document.createElement('img');
  playerImage.src = image;
  playerImage.alt = name;
  playerImage.decoding = 'async';

  imageWrap.append(playerImage);
  
  // Club info
  const clubEl = document.createElement('div');
  clubEl.className = 'foob-player-card-club';

  // Shirt number
  const numberEl = document.createElement('div');
  numberEl.className = 'foob-player-card-number';
  numberEl.textContent = number;
  
  clubEl.append(numberEl, imageWrap);

  // Club logo
  if (logo) {
    const logoWrap = document.createElement('div');
    logoWrap.className = 'foob-player-card-logo';

    const logoImage = document.createElement('img');
    logoImage.src = logo;
    logoImage.alt = club;
    logoImage.decoding = 'async';

    logoWrap.append(logoImage);
    clubEl.append(logoWrap);
  }

  // Player info
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
    captainEl.classList.add('foob-player-card-label', 'captain');
    captainEl.textContent = 'captain';
    
    card.append(captainEl);
  }
  
  if (label) {
    const labelEl = document.createElement('div');
    labelEl.classList.add('foob-player-card-label', label);
    labelEl.textContent = label;
    
    card.append(labelEl);
  }
  
  article.append(card);

  return article;
}

export default PlayerCard;
