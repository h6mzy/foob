import { Countdown } from 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.3/js/index.js';

function renderNextMatch(match, partners, id) {
  if (!match || !id) return;

  // main element
  const main = document.createElement('div');
  main.className = 'foob-nm';

  // nextMatch is opponent and timer wrapper
  const nextMatch = document.createElement('div');
  nextMatch.id = 'foob-nm';

  // opponent
  const opponent = document.createElement('div');
  opponent.id = 'foob-nm-opponent';
  
  const article = document.createElement('article');
  article.className = 'foob-nm-opponent';
  
  const club = document.createElement('div');
  club.className = 'foob-nm-club';
  
  const name = document.createElement('div');
  name.className = 'foob-nm-name';
  name.textContent = match.club.name;
  
  const competition = document.createElement('div');
  competition.className = 'foob-nm-competition';
  competition.textContent = match.competition.name;
  
  club.append(name, competition);
  
  const clubLogoWrap = document.createElement('div');
  clubLogoWrap.className = 'foob-nm-logo';
  
  const clubLogo = document.createElement('img');
  clubLogo.src = club.logo;
  clubLogo.alt = club.name;
  
  clubLogoWrap.append(clubLogo);
  
  const competitionLogoWrap = document.createElement('div');
  competitionLogoWrap.className = 'foob-nm-logo';
  
  const competitionLogo = document.createElement('img');
  competitionLogo.src = competition.logo;
  competitionLogo.alt = competition.name;
  
  competitionLogoWrap.append(competitionLogo);
  
  article.append(club, clubLogoWrap, competitionLogoWrap);
  opponent.append(article);

  // timer
  const timer = document.createElement('div');
  timer.className = 'timer foob-nm-timer';
  timer.id = 'timer';
  
  timer.append(
    createUnit('days', 'DAY'),
    createUnit('hours', 'HRS'),
    createUnit('minutes', 'MIN'),
    createUnit('seconds', 'SEC')
  );

  // append opponent and timer to nextMatch
  nextMatch.append(opponent, timer);

  // partners logos
  const partnersWrap = document.createElement('div');
  partnersWrap.className = 'foob-nm-partners';

  const partnersTitle = document.createElement('div');
  partnersTitle.className = 'foob-nm-partners-title';

  const partners = document.createElement('div');
  partners.id = 'foob-nm-partners';
  partners.append(...partnerElements(partners));

  partnersWrap.append(partnersTitle, partners);

  // append nextMatch and partners to main
  main.append(nextMatch, partnersWrap);

  // append to element
  document.getElementById(id).append(main);

  // start countdown
  renderCountdown(match);
};

export default NextMatch;

const createUnit = (key, label) => {
  const wrapper = document.createElement('div');

  const number = document.createElement('span');
  number.className = 'foob-nm-num';
  number.dataset[key] = '';

  const tens = document.createElement('span');
  const ones = document.createElement('span');

  number.append(tens, ones);

  const unit = document.createElement('span');
  unit.className = 'foob-nm-unit';
  unit.textContent = label;

  wrapper.append(number, unit);

  return wrapper;
};

const partnerElements = (partners) => {
  return partners.map(p => {
    const article = document.createElement('article');
    article.className = 'foob-nm-partner';
  
    const img = document.createElement('img');
    img.src = p.logo;
    img.alt = p.name;
    img.decoding = 'async';
  
    article.append(img);
  
    const a = document.createElement('a');
    a.href = p.website;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  
    a.append(article);
  
    return a;
  })
};

function renderCountdown(match) {
  const time = Date.parse(match.time);
  
  if (!isNaN(time)) {
    Countdown.mount('#timer', time);
  }
};
