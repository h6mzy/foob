import { createElement, createImg } from '../index.js';
import { Countdown } from 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.4/js/index.js';

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
  
  // timer
  const timer = createElement('div', { className: 'timer foob-nm-timer', id: 'timer' });
  timer.append(
    createUnit('days', 'DAY'),
    createUnit('hours', 'HRS'),
    createUnit('minutes', 'MIN'),
    createUnit('seconds', 'SEC')
  );
  
  // append opponent and timer to nextMatch
  nextMatch.append(opponent, timer);
  
  // partners logos
  const partnersWrap = createElement('div', { className: 'foob-nm-partners' });

  if (partners.length > 0) {
    const partnersTitle = createElement('div', { className: 'foob-nm-partners-title', textContent: 'Partners' });
    const partnersEl = createElement('div', { id: 'foob-nm-partners' });
    
    partnersEl.append(...partnerElements(partners));
    partnersWrap.append(partnersTitle, partnersEl);
  }
  
  // append nextMatch and partners to main
  main.append(nextMatch, partnersWrap);
  
  // append to element
  document.getElementById(id).append(main);
  
  // start countdown
  renderCountdown(kickoff);
};

const createUnit = (key, label) => {
  const wrapper = createElement('div');
  const number = createElement('span', { className: 'foob-nm-num', dataset: { [key]: '' } });
  const unit = createElement('span', { className: 'foob-nm-unit', textContent: label });
  wrapper.append(number, unit);
  return wrapper;
};

const partnerElements = (partners) => {
  return partners.map(p => {
    const img = createImg(p.logo, p.name, 'foob-nm-partner');
    const a = createElement('a', { href: p.website, target: '_blank', rel: 'noopener noreferrer' });
    a.append(img);
    return a;
  })
};

function renderCountdown(kickoff) {
  const time = Date.parse(kickoff);
  if (!isNaN(time)) {
    Countdown.mount('#timer', time);
  }
};

export default NextMatch;
