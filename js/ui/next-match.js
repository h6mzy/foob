import { createElement, createImg } from '../index.js';
import { Countdown } from 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.4/js/index.js';

function NextMatch(match, partners, id) {
  if (!match || !id) return;

  const main = createElement('div', { className: 'foob-nm' });
  const nextMatch = createElement('div', { id: 'foob-nm' });
  const opponent = createElement('div', { id: 'foob-nm-opponent' });
  const article = createElement('article', { className: 'foob-nm-opponent' });
  const club = createElement('div', { className: 'foob-nm-club' });
  const clubName = createElement('div', { className: 'foob-nm-name', textContent: match.club.name });
  const competition = createElement('div', { className: 'foob-nm-competition', textContent: match.competition.name });
  club.append(clubName, competition);
  const clubLogo = createImg(match.club.logo, match.club.name, 'foob-nm-logo');
  const compLogo = createImg(match.competition.logo, match.competition.name, 'foob-nm-logo');
  article.append(club, clubLogo, compLogo);
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
  const partnersTitle = createElement('div', { className: 'foob-nm-partners-title', textContent: 'Partners' });
  const partnersEl = createElement('div', { id: 'foob-nm-partners' });
  partnersEl.append(...partnerElements(partners));
  partnersWrap.append(partnersTitle, partnersEl);
  // append nextMatch and partners to main
  main.append(nextMatch, partnersWrap);
  // append to element
  document.getElementById(id).append(main);
  // start countdown
  renderCountdown(match);
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

function renderCountdown(match) {
  const time = Date.parse(match.time);
  if (!isNaN(time)) {
    Countdown.mount('#timer', time);
  }
};

export default NextMatch;
