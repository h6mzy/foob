function ClubCard({
  id = 'RDM',
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
  
  card.append(logoWrap);
  article.append(card);

  return article;
};

export default ClubCard;
