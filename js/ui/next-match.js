import { createElement, createImg } from '../index.js';
import { Countdown } from 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.9/js/index.js';

function NextMatch({
  club = 'Club Name',
  clubLogo = '',
  comp = 'Competition Name',
  compLogo = '',
  kickoff = null,
  partners = []
} = {}) {
  if (!kickoff) return null;

  const main = createElement('div', { className: 'foob-nm-main' });
  const nextMatch = createElement('div', { className: 'foob-nm-details' });
  const opponent = createElement('div', { className: 'foob-nm-opponent' });
  const article = createElement('article', { className: 'foob-nm-opponent-article' });
  const clubEl = createElement('div', { className: 'foob-nm-club' });
  const clubName = createElement('div', { className: 'foob-nm-name', textContent: club });
  const competition = createElement('div', { className: 'foob-nm-competition', textContent: comp });

  clubEl.append(clubName, competition);

  const clubImg = createImg(clubLogo, club, 'foob-nm-logo');
  const compImg = createImg(compLogo, comp, 'foob-nm-logo');

  article.append(clubEl, clubImg, compImg);
  opponent.append(article);

  const countdown = Countdown(kickoff);

  nextMatch.append(opponent, countdown);

  const partnersWrap = createElement('div', { className: 'foob-nm-partners' });

  if (partners.length > 0) {
    const partnersTitle = createElement('div', { className: 'foob-nm-partners-title', textContent: 'Partners' });
    const partnersEl = createElement('div', { className: 'foob-nm-partners' });

    partnersEl.append(...partnerElements(partners));
    partnersWrap.append(partnersTitle, partnersEl);
  }

  main.append(nextMatch, partnersWrap);

  return main;
}

const partnerElements = partners => {
  return partners.map(p => {
    const img = createImg(p.logo, p.name, 'foob-nm-partner');
    const a = createElement('a', { href: p.website, target: '_blank', rel: 'noopener noreferrer' });

    a.append(img);
    
    return a;
  });
};

export default NextMatch;
