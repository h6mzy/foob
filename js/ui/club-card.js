function ClubCard({
  id = 'RDM',
  name = 'Club Name',
  logo = 'https://cdn.jsdelivr.net/gh/h6mzy/foob@main/demo/svg/DKH.svg',
  fluidHeight = false
} = {}) {
  const article = document.createElement('article');
  article.className = 'foob-club-article';

  const card = document.createElement('div');
  card.className = 'foob-club-card';
  
  if (fluidHeight) {
    card.classList.add('fluid-ht');
  }

  // Club image
  const logoWrap = document.createElement('div');
  logoWrap.className = 'foob-club-card-logo';

  const clubLogo = document.createElement('img');
  clubLogo.src = logo;
  clubLogo.alt = name;
  clubLogo.decoding = 'async';

  logoWrap.append(clubLogo);

  // Club name
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.classList.add('foob-club-card-name', 'fill-text');
  
  const text = document.createElementNS(svgNS, 'text');
  text.textContent = name;

  svg.append(text);
  card.append(logoWrap, svg);
  article.append(card);

  return article;
};

export default ClubCard;
